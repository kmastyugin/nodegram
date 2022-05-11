const User = require('../../models/User')

module.exports = async (req, res, next) => {
    const user = await User.findByPk(req.user.id)
    user.avatar = req.uploadFilePath
    await user.save()
    next()
}