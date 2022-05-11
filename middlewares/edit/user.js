const User = require('../../models/User')

module.exports = async (req, res, next) => {
    const { username, nickname, gender } = req.body
    const user = await User.findByPk(req.user.id)
    user.username = username
    user.nickname = nickname
    user.gender = gender

    await user.save()

    next()
}