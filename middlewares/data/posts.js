const Post = require('../../models/Post')
const User = require('../../models/User')

module.exports = async (req, res, next) => {
    const posts = await Post.findAll({
        limit: 10,
        attributes: ['image', 'comment', 'user_id', 'id']
    })

    const users = await User.findAll({
        attributes: ['nickname', 'avatar', 'id']
    })
    
    const postsList = []
    posts.forEach((post) => {
        users.forEach(user => {
            if(post.user_id === user.id) {
                postsList.push({
                    image: post.image,
                    comment: post.comment,
                    nickname: user.nickname,
                    avatar: user.avatar,
                    user_id: user.id,
                    id: post.id,
                })
            }
        })
    })
    req.posts = postsList.reverse()
    next()
}