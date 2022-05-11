const { uuid } = require('uuidv4')
const Token = require('../../models/Token')

module.exports = async (req, res, next) => {
    // Ищем существующий токен
    const actualToken = await Token.findOne({
        where: {
            user_id: req.user.id
        }
    })

    // Удаляем его, если есть
    if(actualToken) {
        await actualToken.destroy()
    }

    // Генерируем новый токен
    const token = uuid()

    // Создаем токен в БД
    await Token.create({
        user_id: req.user.id,
        token
    })

    // Устанавливаем токен в куки
    res.cookie('token', token)

    next()
}