const User = require('../models/User')

module.exports = async (req, res, next) => {
    
    const candidate = await User.findOne({
        where: {
            nickname: req.params.nickname !== 'favicon.ico' ? req.params.nickname : req.user.nickname
        }
    })

    req.candidate = candidate
    next()
}