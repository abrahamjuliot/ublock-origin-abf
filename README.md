# ublock-origin_abort_browser_fingerprinting
Abort Browser Fingerprinting Scripts via uBlock Origin

Recommended Setup:
```
🔒 HTTP Nowhere
|http:$document

🚽 Remove
*##+js(set, navigator.mimeTypes, undefined)
*##+js(set, navigator.plugins, undefined)

🧪 Spoof
*##+js(detectfp)

🧯  Falsify
*##+js(set, navigator.deviceMemory, 4)
*##+js(set, navigator.hardwareConcurrency, 4)
*##+js(set, navigator.maxTouchPoints, 0)

😡  Abort (remove comment when needed)
!*##+js(aopr, HTMLCanvasElement.prototype.toDataURL)
!*##+js(aopr, AudioBuffer.prototype.getChannelData)
!*##+js(aopr, WebGLRenderingContext.prototype.getExtension)
!*##+js(aopr, WebGLRenderingContext.prototype.getParameter)
!*##+js(aopr, BaseAudioContext.prototype.createOscillator)
```
