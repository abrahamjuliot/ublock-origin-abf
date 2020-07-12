# uBlock Origin Abort Browser Fingerprinting (ABF)

![image](https://user-images.githubusercontent.com/6946045/87236128-0ab16800-c39a-11ea-8ce2-109ed7878dc9.png)

![image](https://user-images.githubusercontent.com/6946045/87235602-8c9d9300-c392-11ea-9ccc-7be79702df13.png)

![image](https://user-images.githubusercontent.com/6946045/87235868-ff5c3d80-c395-11ea-87b1-56f759419043.png)

![image](https://user-images.githubusercontent.com/6946045/87235934-164f5f80-c397-11ea-8df9-1468ecf872f1.png)

Abort Browser Fingerprinting Scripts via uBlock Origin

Features include:
1. API protection: canvas, audio, webgl, and clientRects
2. Session Storage: randomization is stored in site session and resets only on a new session
3. Detection: fingerprinting behavior is detected in real time
4. Permission: script execution is paused and your permission is required to allow fingerprinting (per session)
4a. Allow: if permission is allowed, you will not be alerted when fingerprinting is detected per site session. API protection will continue.
4b. Deny: if permission is denied, a random error will be thrown at the script and future attempts per site session
5. Genuine: random output does not include random strings of gibberish characters
6. Defensive: api tampering is protected with a [proxy](https://adtechmadness.wordpress.com/2019/03/23/javascript-tampering-detection-and-stealth/) to prevent detection

Recommended Setup:
```
🔒 HTTP Nowhere
|http:$document

🧪 Spoof
*##+js(abf)
```

uBlock Origin Guides:
- Scriplet injection: https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#scriptlet-injection
- Adding resources: https://github.com/gorhill/uBlock/wiki/Advanced-settings#userresourceslocation
- uBlock Origin's Resource Library: https://github.com/gorhill/uBlock/wiki/Resources-Library
- If you use scripts in this repo, I recommend self-hosting (via github) to ensure you have full control
- Feel free to copy, rewrite, make this your own, do as you wish, etc.
