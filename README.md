# uBlock Origin Abort Browser Fingerprinting (ABF)

[![image](https://user-images.githubusercontent.com/6946045/87260830-8ed22100-c468-11ea-86ec-a9c730deb89e.gif)](https://fingerprintjs.com/demo)

## Abort Browser Fingerprinting Scripts via uBlock Origin

### Features:
1. **[API protection](https://user-images.githubusercontent.com/6946045/87235868-ff5c3d80-c395-11ea-87b1-56f759419043.png)**: canvas, audio, webgl, and clientRects
2. **Session Based**: randomization is stored in site session and resets only on a new session
3. **Detection**: fingerprinting behavior is detected in real time
4. **Permission**: script execution is paused and your permission is required to allow fingerprinting (per session)<sup>1</sup>
5. **Defensive**: api tampering is protected with a [proxy](https://adtechmadness.wordpress.com/2019/03/23/javascript-tampering-detection-and-stealth/) to prevent detection
6. **Genuine**: random output does not contain gibberish
7. **Minimal**: to avoid site breakage, APIs are not blocked and only a few are altered

<sup>1</sup> If cancel (abort) is selected, a random error will be thrown 1 or more times at the script as it attempts to finish fingerprinting. This may or may not abort the script. During the session, if the script URL was identified and later resurfaces, an error will be thrown at the script on every attempt it tries to read a high entropy property. This final blow should abort the script and render it useless. To avoid detection, the error randomization is reset only after a 30 second delay. Since scripts may yield different results, use this option with caution: [1] the error is intended to [break the script](https://www.nothingprivate.ml), [2] in the case of muliple sessions (cross site fingerprinting), the error may be [computed as random output](https://panopticlick.eff.org), [3] the error may be [properly handled](https://ghacksuserjs.github.io/TorZillaPrint/TorZillaPrint.html), or [4] the collection of random errors may be traced per session and then used to fingerprint your browser and link your sessions.

[![image](https://user-images.githubusercontent.com/6946045/87260252-a0fe9000-c465-11ea-8e67-a7af969508a3.png)](https://www.nothingprivate.ml)

![image](https://user-images.githubusercontent.com/6946045/87278150-a32e1200-c498-11ea-8a32-0431c656adce.png)

### uBlock Origin Setup:
1. **Inject**: Select the advanced user icon in Settings and add the `.../abf.js` scriplet url to `userResourcesLocation`. Host the file in your own repo for full control and security.

![image](https://user-images.githubusercontent.com/6946045/87236337-eb680a00-c39c-11ea-8806-cb20e4f55896.png)

![image](https://user-images.githubusercontent.com/6946045/87236365-72b57d80-c39d-11ea-9ad9-462ddffa19aa.png)

2. **Apply**: add the script to My Filters and disable on your preferred domains
```
! apply globally
*##+js(abf)

! except on these domains
youtube.com#@#+js(abf)
google.com#@#+js(abf)
```

### uBlock Origin Guides:
- Scriplet injection: https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#scriptlet-injection
- Adding resources: https://github.com/gorhill/uBlock/wiki/Advanced-settings#userresourceslocation
- uBlock Origin's Resource Library: https://github.com/gorhill/uBlock/wiki/Resources-Library
- If you use scripts in this repo, I recommend self-hosting (via github) to ensure you have full control
- Feel free to copy, rewrite, make this your own, do as you wish, etc.

### Broswer support
- [X]  Chromium
- [X]  Firefox
- [ ]  Chromium Android
- [X]  Firefox Android

### Test site
[https://creepjs-live.abrahamjuliot.repl.co](https://creepjs-live.abrahamjuliot.repl.co)
