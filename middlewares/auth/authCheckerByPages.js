const Token = require('../../models/Token')

module.exports = async (req, res, next) => {
    const token = req.cookies.token

    // Если есть токен в куках
    if(token) {
        const actualToken = await Token.findOne({
            where: {
                token: token
            }
        })

        // Токен в порядке
        if(actualToken) {
            next()
        }
        // Невалидный токен
        else {
            if(actualToken) await actualToken.destroy()
            res.clearCookie('token')
            res.redirect('/auth')
        }

    }
    else {
        return res.redirect(`/auth`)
    }
}