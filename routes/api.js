
const { Router } = require('express')
const router = Router()
const Like = require('../models/Like')
// Получение информации об аккаунте
const getAccountInfo = require('../middlewares/auth/getAccountInfo')
// Изменение профиля
const editUser = require('../middlewares/edit/user')

// Получение информации о себе
router.get('/info', getAccountInfo, (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Success',
        ...req.user
    })
})

// Изменение информации о себе
router.post('/info', getAccountInfo, editUser, async (req, res) => {
    res.redirect('/profile')
})

// Лайк записи
router.post('/like/:post_id', getAccountInfo, async (req, res) => {
    // Айди записи
    const id = +req.params.post_id
    const like = await Like.findOne({
        where: {
            post_id: id,
            user_id: req.user.id
        }
    })
    
    // Если лайка нет - добавляем
    if(!like) {
        await Like.create({
            user_id: req.user.id,
            post_id: id
        })

        res.json(true)
    } 
    // Иначе добавляем
    else {
        await like.destroy()
        res.json(false)
    }
})

// Все айди лайкнутых записей
router.get('/likes', getAccountInfo, async (req, res) => {
    const likes = await Like.findAll({
        where: {
            user_id: +req.user.id
        }
    })

    // Массив с ID записей, где стоят лайки
    const formatedLikes = []
    likes.forEach(like => {
        formatedLikes.push(like.post_id)
    })

    res.status(200).json(formatedLikes)
})

// Кол-во лайков на записи
router.get('/likes/:id', async (req, res) => {
    const likes = await Like.count({
        where: {
            post_id: +req.params.id
        }
    })

    res.json(likes)
})

module.exports = router