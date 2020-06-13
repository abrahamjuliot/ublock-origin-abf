Spoof Browser Fingerprinting Scripts via uBlock Origin

- Scriplet injection: https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#scriptlet-injection
- Adding resources: https://github.com/gorhill/uBlock/wiki/Advanced-settings#userresourceslocation
- uBlock Origin's Resource Library: https://github.com/gorhill/uBlock/wiki/Resources-Library
- If you use scripts in this repo, I recommend self-hosting (via github) to ensure you have full control

Recommended Setup:
```
🔒 HTTP Nowhere
|http:$document

🧪 Spoof
*##+js(detectfp)
```
