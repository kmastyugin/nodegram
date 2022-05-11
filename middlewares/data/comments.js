const User = require('../../models/User')
const Comment = require('../../models/Comment')

module.exports = async (req, res, next) => {
    return console.log(req.params)
    const comments = await Comment.findAll({
        attributes: ['id', 'comment', 'user_id'],
        where: {
            post_id: +req.params.id
        }
    })

    return console.log(comments)

    // const users = await User.findAll({
    //     attributes: ['nickname', 'avatar', 'id']
    // })

    // const usersList = []
    // comments.forEach((comment, index) => {
    //     users.forEach(user => {
    //         console.log(user)
    //         if(comment.user_id === user.id) {
    //             usersList.push({
    //                 comment: comment.comment,
    //                 nickname: user.nickname
    //             })
    //         }
    //     })
    // })

    // req.allComments = usersList

    next()
}