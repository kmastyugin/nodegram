const User = require('../../models/User')
const madness = require('../../modules/madness')

module.exports = async (req, res, next) => {
    const compare = madness()

    const users = await User.findAll({
        limit: 6,
        attributes: ['avatar', 'nickname']
    })

    const formatedUsers = []
    users.forEach(user => {
        formatedUsers.push({
            avatar: user.avatar,
            nickname: user.nickname
        })
    })

    req.recUsers = formatedUsers.sort(compare)

    next()
}