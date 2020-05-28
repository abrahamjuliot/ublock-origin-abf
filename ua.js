// https://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today

//https://developers.whatismybrowser.com/useragents/explore/operating_system_name/linux/

//https://developers.whatismybrowser.com/useragents/explore/software_name/chrome/

// Random Chrome User Agent
const listRand = (list) => list[Math.floor(Math.random() * list.length)]
const mozilla = 'Mozilla/'
const apple = 'AppleWebKit/537.36'
const gecko = '(KHTML, like Gecko)'
const safari = 'Safari/537.36'
const system = () => {
    const linux = listRand(['Linux x86_64', 'Linux armv7l', 'Linux i686'])
    return [{
            agent: 'Windows NT 10.0; Win64; x64',
            platform: 'Win32'
        },
        {
            agent: `X11; ${linux}`,
            platform: linux
        },
        {
            agent: 'Macintosh; Intel Mac OS X 10_15_4',
            platform: 'MacIntel'
        }
    ]
}
const os = system()
const {
    agent,
    platform
} = listRand(os)
const version = [
    '83.0.4103.61',
    '81.0.4044.138',
    '80.0.3987.149',
    '79.0.3945.130',
    '78.0.3904.108',
    '77.0.3865.90',
    '75.0.3770.142'
]
const appVersion = `5.0 (${agent}) ${apple} ${gecko} Chrome/${listRand(version)} ${safari}`
const userAgent = `${mozilla}${appVersion}`
Object.defineProperties(navigator, {
    'appVersion': {
        value: appVersion
    },
    'platform': {
        value: platform
    },
    'userAgent': {
        value: userAgent
    }
})
console.log(`randomized chrome user-agent: ${navigator.userAgent}`)
