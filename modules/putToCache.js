module.exports = (elem, cache) => {
    if (cache.indexOf(elem) != -1) {
        return
    }

    const i = Math.floor(Math.random() * (cache.length + 1))
    cache.splice(i, 0, elem)
}