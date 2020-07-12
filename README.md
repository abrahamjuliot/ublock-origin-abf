# uBlock Origin Abort Browser Fingerprinting (ABF)

![image](https://user-images.githubusercontent.com/6946045/87236288-2ae22680-c39c-11ea-8b35-5db24e6f19b6.png)

## Abort Browser Fingerprinting Scripts via uBlock Origin

### Features:
1. **[API protection](https://user-images.githubusercontent.com/6946045/87235868-ff5c3d80-c395-11ea-87b1-56f759419043.png)**: canvas, audio, webgl, and clientRects
2. **Session Based**: randomization is stored in site session and resets only on a new session
3. **Detection**: fingerprinting behavior is detected in real time
4. **Permission**: script execution is paused and your permission is required to allow fingerprinting (per session)
4a. if permission is allowed, you will not be alerted when fingerprinting is detected per site session. API protection will continue.
4b. if permission is denied, a [random error](https://user-images.githubusercontent.com/6946045/87235934-164f5f80-c397-11ea-8df9-1468ecf872f1.png) will be thrown at the script and any future attempts during the site session. API protection will continue. <sup>1</sup>
5. **Defensive**: api tampering is protected with a [proxy](https://adtechmadness.wordpress.com/2019/03/23/javascript-tampering-detection-and-stealth/) to prevent detection

<sup>1</sup> If permission is denied, a new random error will be thrown on each fingerprinting attempt during the session. Use this option with caution as it yields different results depending on the script: [1] the error may [break the script](https://www.nothingprivate.ml/) (the goal), [2] the error may be [computed as a random value](https://panopticlick.eff.org/) (even better), [3] the error may be [properly handled](https://ghacksuserjs.github.io/TorZillaPrint/TorZillaPrint.html) by the script, or [4] the error may be rendered an invalid browser error and then used to fingerprint your browser.

### uBlock Origin Setup:
1. Select the advanced user icon in Settings

![image](https://user-images.githubusercontent.com/6946045/87236337-eb680a00-c39c-11ea-8806-cb20e4f55896.png)

2. Add the `.../abf.js` scriplet url to `userResourcesLocation`. Host the file in your own repo for full control and security.

![image](https://user-images.githubusercontent.com/6946045/87236365-72b57d80-c39d-11ea-9ad9-462ddffa19aa.png)

3. inject the scriplet to My Filters. Use `*` to apply to sites globally.
```
*##+js(abf)
```

### uBlock Origin Guides:
- Scriplet injection: https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#scriptlet-injection
- Adding resources: https://github.com/gorhill/uBlock/wiki/Advanced-settings#userresourceslocation
- uBlock Origin's Resource Library: https://github.com/gorhill/uBlock/wiki/Resources-Library
- If you use scripts in this repo, I recommend self-hosting (via github) to ensure you have full control
- Feel free to copy, rewrite, make this your own, do as you wish, etc.

### Broswer support
- [X]  Chromium
- [ ]  Firefox
- [ ]  Chromium Android
- [ ]  Firefox Android
