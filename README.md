[Pre-alpha]

![image](https://user-images.githubusercontent.com/6946045/87213055-e2ad0080-c2d6-11ea-986b-5f6a5680c83d.png)
![image](https://user-images.githubusercontent.com/6946045/87213150-ba71d180-c2d7-11ea-9af5-8580de0a4f91.png)
![image](https://user-images.githubusercontent.com/6946045/87213139-9f9f5d00-c2d7-11ea-9d54-20cfb3e9d2ac.png)

Spoof Browser Fingerprinting Scripts via uBlock Origin

- Scriplet injection: https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#scriptlet-injection
- Adding resources: https://github.com/gorhill/uBlock/wiki/Advanced-settings#userresourceslocation
- uBlock Origin's Resource Library: https://github.com/gorhill/uBlock/wiki/Resources-Library
- If you use scripts in this repo, I recommend self-hosting (via github) to ensure you have full control
- Feel free to copy, rewrite, make this your own, do as you wish, etc.

Recommended Setup:
```
🔒 HTTP Nowhere
|http:$document

🧪 Spoof
*##+js(detect)
```
