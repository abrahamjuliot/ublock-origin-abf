
(function() {
	const domLoaded = (fn) => document.readyState != 'loading'?
    	fn(): document.addEventListener('DOMContentLoaded', fn)

	const rand = (min, max) =>
        (Math.floor(Math.random() * (max - min + 1)) + min)
        
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
		const bounding = type == 'elementB' || type == 'rangeB' ? true : false
		const domRectify = (domRects, bounding) => {
			const props = [
				'bottom',
				'height',
				'left',
				'right',
				'top',
				'width',
				'x',
				'y'
			]
			if (!bounding) {
				let i, len = domRects.length
				for (i = 0; i < len; i++) {
					props.forEach(prop => { domRects[i][prop] += offset[prop] })
				}
				return domRects
			}
			props.forEach(prop => { domRects[prop] += offset[prop] })
			return domRects
		}
		return function () {
			const domRects = method.apply(this, arguments)
			const computedDomRects = domRectify(domRects, bounding)
			return computedDomRects
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
