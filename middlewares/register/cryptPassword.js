const sha1 = require('sha1')

module.exports = async (req, res, next) => {
    const { password } = req.body

    const hash = sha1(`рандомная${password}строка`)
    req.body.password = hash

    next()
}