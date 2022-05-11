const { redirect } = require('express/lib/response')
const sha1 = require('sha1')
const User = require('../../models/User')

module.exports = async (req, res, next) => {
    const { nickname, password } = req.body

    const user = await User.findOne({
        where: {
            nickname
        }
    })

    if(!user) {
        const message = encodeURIComponent('Пользователь не найден')
        return res.redirect(`/auth?message=${message}`)
    }

    // Хэш пароля
    const hash = sha1(`рандомная${password}строка`)

    if(!user || hash !== user.password) {
        const message = encodeURIComponent('Пользователь не найден')
        return res.redirect(`/auth?message=${message}`)
    }

    // Сохранение пользователя для установки токена
    req.user = user

    next()
}