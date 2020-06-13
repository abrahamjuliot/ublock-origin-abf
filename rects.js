
(function() {
	const domLoaded = (fn) => document.readyState != 'loading'?
    	fn(): document.addEventListener('DOMContentLoaded', fn)

	const getRandomOffset = () => Math.floor(Math.random()*100)/100
	const offset = {
		bottom: getRandomOffset(),
		height: getRandomOffset(),
		left: getRandomOffset(),
		right: getRandomOffset(),
		top: getRandomOffset(),
		width: getRandomOffset(),
		x: getRandomOffset(),
		y: getRandomOffset()
	}

	const elementGetClientRects = Element.prototype.getClientRects
	const elementGetBoundingClientRect = Element.prototype.getBoundingClientRect
	const rangeGetClientRects = Range.prototype.getClientRects
	const rangeGetBoundingClientRect = Range.prototype.getBoundingClientRect
	
	const randomRect = type => {
		const method = (
			type == 'rangeC' ? rangeGetClientRects :
			type == 'rangeB' ? rangeGetBoundingClientRect :
			type == 'elementC' ? elementGetClientRects :
			type == 'elementB' ? elementGetBoundingClientRect : ''
		)
		const domRectify = (client) => {
			if (client.length) {
				let i, len = client.length
				for (i = 0; i < len; i++) {
					client[i]['bottom'] += offset['bottom']
					client[i]['height'] += offset['height']
					client[i]['left'] += offset['left']
					client[i]['right'] += offset['right']
					client[i]['top'] += offset['top']
					client[i]['width'] += offset['width']
					client[i]['x'] += offset['x']
					client[i]['y'] += offset['y']
				}
				return client
			}
			const props = [ 'bottom', 'height', 'left', 'right', 'top', 'width', 'x', 'y' ]
			props.forEach(prop => { client[prop] += offset[prop] })
			return client
		}
		return function () {
			const client = method.apply(this, arguments)
			return domRectify(client)
	    }
	}
    
	function redefine(root) {
		Object.defineProperties(
			root.Element.prototype, {
				'getClientRects': {
					get: () => randomRect('elementC')
				},
				'getBoundingClientRect': {
					get: () => randomRect('elementB')
				}
			}
		)
		Object.defineProperties(
			root.Range.prototype, {
				'getClientRects': {
					get: () => randomRect('rangeC')
				},
				'getBoundingClientRect': {
					get: () => randomRect('rangeB')
				}
			}
		)
	}
	
	redefine(window)
	domLoaded(() => {
		;[...document.getElementsByTagName('iframe')].forEach(frame => redefine(frame.contentWindow))	
	})
	
})()
