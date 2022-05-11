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
            res.redirect('/')
        }
        // Невалидный токен
        else {
            res.clearCookie('token')
            next()
        }

    }
    else {
        next()
    }
}