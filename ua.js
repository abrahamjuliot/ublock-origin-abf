// Random Chrome User Agent
const listRand = (list) => list[Math.floor(Math.random() * list.length)]
const mozilla = 'Mozilla/5.0'
const apple = 'AppleWebKit/537.36'
const gecko = '(KHTML, like Gecko)'
const safari = 'Safari/537.36'

const os = [
	'Windows NT 10.0; Win64; x64',
	'X11; Linux x86_64',
	'Macintosh; Intel Mac OS X 10_15_4'
]
const version = [
	'83.0.4103.61',
	'81.0.4044.138',
	'80.0.3987.149',
	'79.0.3945.130',
	'78.0.3904.108',
	'77.0.3865.90',
	'75.0.3770.142'
]

const ua = `${mozilla} (${listRand(os)}) ${apple} ${gecko} Chrome/${listRand(version)} ${safari}`
console.log(ua)
