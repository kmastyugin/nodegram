const User = require('../../models/User')

module.exports = async (req, res, next) => {
    const { nickname } = req.body
    
    // Проверка на никнейм
    const candidate = await User.findOne({
        where: {
            nickname
        }
    })

    // Если найден пользователь с таким именем
    if(candidate) {
        const message = encodeURIComponent('Пользователь с таким именем уже зарегистрирован')
        return res.redirect(`/register?message=${message}`)
    }

    next()
}