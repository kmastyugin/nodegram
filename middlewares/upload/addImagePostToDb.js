const Post = require('../../models/Post')

module.exports = async (req, res, next) => {
    await Post.create({
        image: req.uploadFilePath,
        comment: req.body.comment,
        user_id: req.user.id
    })

    next()
}