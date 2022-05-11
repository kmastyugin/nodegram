const Token = require('../../models/Token')

module.exports = async (req, res, next) => {
    const actualToken = await Token.findOne({
        where: {
            token: req.cookies.token
        }
    })

    if(actualToken) {
        await actualToken.destroy()
        res.clearCookie('token')
    }

    res.redirect('/auth')
}