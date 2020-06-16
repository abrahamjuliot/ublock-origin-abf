// https://audiofingerprint.openwpm.com
(function() {
    const rand = (min, max) =>
        (Math.floor(Math.random() * (max - min + 1)) + min)
        
    function audioTest() {
        const context = new AudioContext()
        const channels = 2
        const frameCount = (context.sampleRate)
        const audioBuffer = context.createBuffer(2, frameCount, context.sampleRate)
        const channelData = audioBuffer.getChannelData(0)
        const computedAudio = channelData
            .slice(4500, 5000)
            .reduce((acc, val) => acc + Math.abs(val), 0)
            .toString()
        return console.log(computedAudio)
    }

    const { getChannelData, copyFromChannel } = AudioBuffer.prototype
    const noise = Math.random() * 0.0000001

    function computePCMData(obj, args) {
        const data = getChannelData.apply(obj, args)
        let i, len = data.length
        for (i = 0; i < len; i++) {
            // ensure audio is within range of -1 and 1
            const audio = data[i]
            const noisified = audio + noise
            data[i] = noisified > -1 && noisified < 1 ? noisified : audio
        }
        obj._pcmDataComputedChannel = args[0]
        obj._pcmDataComputed = data
        return data
    }

    function randomAudio(channel) {
        // if pcm data is already computed to this AudioBuffer Channel then return it
        if (this._pcmDataComputed && this._pcmDataComputedChannel == channel) {
            return this._pcmDataComputed
        }
        // else compute pcm data to this AudioBuffer Channel and return it
        const data = computePCMData(this, arguments)
        return data
    }

    function randomCopy(destination, channel) {
        // if pcm data is not yet computed to this AudioBuffer Channel then compute it
        if (!(this._pcmDataComputed && this._pcmDataComputedChannel == channel)) {
            computePCMData(this, [channel])
        }
        // else make no changes to this AudioBuffer Channel (seeing it is already computed)
        return copyFromChannel.apply(this, arguments)
    }
    
    const { getByteFrequencyData, getFloatFrequencyData } = AnalyserNode.prototype
	const frequencyNoise = Math.random() * 0.001
	
	function computeFrequencyData(data) {
		let i, len = data.length
        for (i = 0; i < len; i++) {
            data[i] += frequencyNoise
        }
        return
	}
	
	function randomByte(uint8Arr) {
        getByteFrequencyData.apply(this, arguments)
        computeFrequencyData(uint8Arr)
        return
    }
    
    function randomFloat(float32Arr) {
        getFloatFrequencyData.apply(this, arguments)
        computeFrequencyData(float32Arr)
        return
    }
    
	
    function redefine(root) {
        Object.defineProperties(
            root.AudioBuffer.prototype, {
                'getChannelData': {
                    get: () => randomAudio
                },
                'copyFromChannel': {
                    get: () => randomCopy
                }
            }
        )
        	
        Object.defineProperties(
			root.AnalyserNode.prototype, {
                'getByteFrequencyData': {
                    get: () => randomByte
                },
                'getFloatFrequencyData': {
                    get: () => randomFloat
                }
            }
    	)
    	
    	// Resist lie detection 
    	function setApiName(api, name) {
        	Object.defineProperty(api, 'name', { writable: true })
        	api.name = name
        }
    	
    	setApiName(root.AudioBuffer.prototype.getChannelData, 'getChannelData')
    	setApiName(root.AudioBuffer.prototype.copyFromChannel, 'copyFromChannel')
    	setApiName(root.AnalyserNode.prototype.getByteFrequencyData, 'getByteFrequencyData')
    	setApiName(root.AnalyserNode.prototype.getFloatFrequencyData, 'getFloatFrequencyData')
    	
    	const library = {
    		getChannelData: 'getChannelData',
    		copyFromChannel: 'copyFromChannel',
    		getByteFrequencyData: 'getByteFrequencyData',
    		getFloatFrequencyData: 'getFloatFrequencyData'
    		
    	}
    	const { toString: fnToStr } = Function.prototype
		function toString() {
			const name = this.name
			if (name === library[name]) {
				return `function ${library[name]}() { [native code] }`
			}
			return fnToStr.apply(this, arguments)
		}
		root.Function.prototype.toString = toString
		root.Function.prototype.toString.toString = () => 'function toString() { [native code] }'
    	
    }

    redefine(window)

    const domLoaded = (fn) => document.readyState != 'loading' ?
        fn() : document.addEventListener('DOMContentLoaded', fn)
    domLoaded(() => {
        ;[...document.getElementsByTagName('iframe')].forEach(frame => redefine(frame.contentWindow))
    })
    //audioTest()
})()


// Detect Lie
function hasLiedAPI(api, name) {
	const hashMini = str => {
	    const json = `${JSON.stringify(str)}`
	    let i, len, hash = 0x811c9dc5
	    for (i = 0, len = json.length; i < len; i++) {
	        hash = Math.imul(31, hash) + json.charCodeAt(i) | 0
	    }
	    return ('0000000' + (hash >>> 0).toString(16)).substr(-8)
	}
	const native = (x) => `function ${x}() { [native code] }`
	let lieTypes = []
	let fingerprint = ''
	
	// detect attempts to rewrite Function string conversion APIs
	const fnToStr = Function.prototype.toString
	const fnToLStr = Function.prototype.toLocaleString
	const fnStr = String
	const fnStringify = JSON.stringify
	if (fnToStr != native('toString')) { lieTypes.push({ fnToStr }) }
	if (fnToLStr != native('toLocaleString')) { lieTypes.push({ fnToLStr }) }
	if (fnStr != native('String')) { lieTypes.push({ fnStr }) }
	if (fnStringify != native('stringify')) { lieTypes.push({ fnStringify }) }
	
	// detect attempts to rename the API and/or rewrite string conversion APIs on this API object
	const { name: apiName, toString: apiToString, toLocaleString: apiToLocaleString } = api
	if (apiName != name) { lieTypes.push({ apiName }) }
	if (apiToString !== fnToStr) { lieTypes.push({ apiToString }) }
	if (apiToLocaleString !== fnToLStr) { lieTypes.push({ apiToLocaleString }) }
	
	// collect string conversion result
	const result = ''+api
	
	// fingerprint result if it does not match native code
	if (result != native(name)) { fingerprint = result }
	
	//console.log({ lieTypes, fingerprint })
	
	return {
		lied: lieTypes.length || fingerprint ? true : false,
		hash: hashMini({ lieTypes, fingerprint })
	}
}

function lieDetect(api, name) {
	const { lied, hash } = hasLiedAPI(api, name)
	return lied && console.log(`API Lie Detected: ${hash}`)
}

lieDetect(AudioBuffer.prototype.getChannelData, 'getChannelData')
lieDetect(AudioBuffer.prototype.copyFromChannel, 'copyFromChannel')
lieDetect(AnalyserNode.prototype.getByteFrequencyData, 'getByteFrequencyData')
lieDetect(AnalyserNode.prototype.getFloatFrequencyData, 'getFloatFrequencyData')
