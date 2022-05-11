const putToCache = require('./putToCache')

module.exports = () => {
	const cache = []

	return (a, b) => {
		putToCache(a, cache)
		putToCache(b, cache)
		return cache.indexOf(b) - cache.indexOf(a)
	}
}