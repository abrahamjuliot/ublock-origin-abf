
(function() {
	const hashify = str => {
		let i, len, hash = 0x811c9dc5
		for (i = 0, len = str.length; i < len; i++) {
			hash = Math.imul(31, hash) + str.charCodeAt(i)|0
		}
		return ("0000000" + (hash >>> 0).toString(16)).substr(-8)
	}
	const domLoaded = (fn) => document.readyState != 'loading'?
    	fn(): document.addEventListener('DOMContentLoaded', fn)
    const rand = (min, max) =>
		(Math.floor(Math.random() * (max - min + 1)) + min)
	function randomRGBA() {
	    const clr = () => Math.round(Math.random()*255)
	    return `rgba(${clr()},${clr()},${clr()},${Math.random().toFixed(1)})`
	}
	function randomFont() {
		const fontFamily = [
		  'Arial','Arial Black','Arial Narrow','Courier','Courier New','Georgia','Helvetica',
		  'Impact','Lucida Console','monospace','Tahoma','Times','Times New Roman','Verdana'
		]
		const fontSize = Math.floor((Math.random() * 100) + 12)
		const rand = Math.floor(Math.random()*fontFamily.length)
		return `${fontSize}px '${fontFamily[rand]}'`
	}
	const color1Computed = randomRGBA()
	const color2Computed = randomRGBA()
	const color3Computed = randomRGBA()
	const fontComputed = randomFont()
	const widthOffsetComputed = rand(-10,10)
	const heightOffsetComputed = rand(-10,10)
	const canvasProto = HTMLCanvasElement.prototype
	const getContext = HTMLCanvasElement.prototype.getContext
	const toDataURL = HTMLCanvasElement.prototype.toDataURL
	const bufferData = WebGLRenderingContext.prototype.bufferData
	
	const randomCanvas = function () {
		console.log(this._contextType)
		if (this._contextType == '2d') {
			const context = getContext.apply(this, ['2d'])
			context.textBaseline = 'top'
			context.textBaseline = 'alphabetic'
			context.fillStyle = color1Computed
			context.shadowColor = color2Computed
			context.strokeStyle = color3Computed
			context.fillText('.', 4, 17)
			context.font = fontComputed
			return toDataURL.apply(this, arguments)
		}
		else if (this._contextType == 'webgl') {
			this.width += widthOffsetComputed 
			this.height += heightOffsetComputed
			const url = toDataURL.apply(this, arguments)
			console.log(hashify(JSON.stringify(url)))
			return toDataURL.apply(this, arguments)
		}
		return toDataURL.apply(this, arguments)
    }
    
	function redefine(root) {
		Object.defineProperties(
			root.HTMLCanvasElement.prototype, {
				'getContext': {
					get: () => function (contextType, contextAttributes) {
						canvasProto._contextType = contextType
						return getContext.apply(this, arguments)
					}
				},
				'toDataURL':  {
					get: () => randomCanvas
				} 
				
			}
		)
	}
	redefine(window)
	domLoaded(() => {
		;[...document.getElementsByTagName('iframe')].forEach(frame => redefine(frame.contentWindow))	
	})
})()
