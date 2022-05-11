const Token = require('../../models/Token')
const User = require('../../models/User')

module.exports = async (req, res, next) => {
    // Ищем токен, чтобы узнать ID пользователя
    const { user_id } = await Token.findOne({
        where: {
            token: req.cookies.token
        }
    })

    // Ищем пользователя по ID
    const user = await User.findOne({
        where: {
            id: user_id
        }
    })

    // Объект пользователя для отображения на страницах
    const data = {
        id: user.id,
        name: user.username,
        nickname: user.nickname,
        gender: user.gender,
        avatar: user.avatar,
    }

    req.user = data
    next()
}