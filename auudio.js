// 
// https://audiofingerprint.openwpm.com

 (function() {
    const rand = (min, max) =>
        (Math.floor(Math.random() * (max - min + 1)) + min)

	function audioTest() {
		const context = new AudioContext()
		const channels = 2
		const frameCount = (context.sampleRate)
		const audioBuffer = context.createBuffer(2, frameCount, context.sampleRate)
		
		console.log(audioBuffer)
		
		const channelData = audioBuffer.getChannelData(0)
		
		//for (let i = 0; i < frameCount; i++) { nowBuffering[i] = Math.random() * 2 - 1 }

		const computedAudio = channelData
			.slice(4500, 5000)
			.reduce((acc, val) => acc + Math.abs(val), 0)
			.toString()
			
		return console.log(computedAudio)
	}
	
    const getChannelData = AudioBuffer.prototype.getChannelData
    const copyFromChannel = AudioBuffer.prototype.copyFromChannel
    
    const noise = Math.random()*0.0000001 //Math.random() * 2 - 1
	function randomAudio(channel) {
		const data = getChannelData.apply(this, arguments)
		let i, len = data.length
		for (i = 0; i < len; i++) {
			// ensure audio is within range of -1 and 1
			const audio = data[i]
			const noisified = audio + noise
			data[i] = noisified > -1 && noisified < 1 ? noisified : audio
		}
		return data
	}
	
	function randomCopy(destination, channel, startInChannel) {
		this.getChannelData(channel)
		return copyFromChannel.apply(this, arguments)
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
    }
    
    redefine(window)
    
    const domLoaded = (fn) => document.readyState != 'loading' ?
        fn() : document.addEventListener('DOMContentLoaded', fn)
    domLoaded(() => {
        ;[...document.getElementsByTagName('iframe')].forEach(frame => redefine(frame.contentWindow))
    })
    //audioTest()
})()
