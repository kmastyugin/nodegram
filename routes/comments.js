const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const Comment = require('../models/Comment')
// Получение информации об аккаунте
const getAccountInfo = require('../middlewares/auth/getAccountInfo')

// Получить все комментарии по ID публикации
router.get('/:id', async (req, res) => {
    const comments = await Comment.findAll({
        attributes: ['id', 'comment', 'user_id'],
        where: {
            post_id: +req.params.id
        }
    })

    const users = await User.findAll({
        attributes: ['nickname', 'avatar', 'id']
    })

    const usersList = []
    comments.forEach((comment, index) => {
        users.forEach(user => {
            if(comment.user_id === user.id) {
                usersList.push({
                    comment: comment.comment,
                    nickname: user.nickname
                })
            }
        })
    })

    res.status(200).json(usersList.reverse())
})

// Добавить комментарий в БД
router.post('/:id', getAccountInfo, async (req, res) => {
    const { post_id, comment } = req.body
    const comm = await Comment.create({
        post_id,
        comment,
        user_id: req.user.id
    })

    const user = await User.findByPk(req.user.id, {
        attributes: ['nickname', 'avatar']
    })

    res.status(201).json({
        nickname: user.nickname,
        avatar: user.avatar,
        user_id: req.user.id,
        comment
    })
})


module.exports = router