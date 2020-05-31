
(function() {
	const domLoaded = (fn) => document.readyState != 'loading'?
    	fn(): document.addEventListener('DOMContentLoaded', fn)
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
	color1Computed = randomRGBA()
	color2Computed = randomRGBA()
	color3Computed = randomRGBA()
	fontComputed = randomFont()
	const canvasProto = HTMLCanvasElement.prototype
	const getContext = HTMLCanvasElement.prototype.getContext
	const toDataURL = HTMLCanvasElement.prototype.toDataURL
	const bufferData = WebGLRenderingContext.prototype.bufferData
	
	const randomCanvas = function () {
		// check for 2d vs webgl in arguments
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
		}
		else if (this._contextType == 'webgl') {
			const context = getContext.apply(this, ['webgl'])
			
			// const vertexPosBuffer = context.createBuffer()
			// console.log(context.ARRAY_BUFFER)
			// context.bindBuffer(context.ARRAY_BUFFER, vertexPosBuffer)
			// const vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0])
			// const random = vertices.map(n => Math.random())
			// console.log(random)
			// context.bufferData(context.ARRAY_BUFFER, random, context.STATIC_DRAW)
			
			// randomiz dataURL
			console.log(toDataURL.apply(this, arguments))
		}
		const dataURL = toDataURL.apply(this, arguments)
		return dataURL
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
				
			},
			root.WebGLRenderingContext.prototype, {
				'bufferData':  {
					get: () => function() {
						console.log(arguments)
						return bufferData.apply(this, arguments)
					}
				} 
				
			}
		)
	}
	redefine(window)
	domLoaded(() => {
		;[...document.getElementsByTagName('iframe')].forEach(frame => redefine(frame.contentWindow))	
	})
})()
