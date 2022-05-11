const { Router } = require('express')
const router = Router()
const Post = require('../models/Post')
// Проверка на наличие токена
const authChecker = require('../middlewares/auth/authCheckerByPages')
// Получение информации об аккаунте
const getAccountInfo = require('../middlewares/auth/getAccountInfo')
// Получение постов
const getPosts = require('../middlewares/data/posts')
// Генерация случайных пользователей
const generateRec = require('../middlewares/data/generateRec')
// Определение юзера для формирования страницы
const userPage = require('../middlewares/userPage')

// Главная страница
router.get('/', authChecker, getAccountInfo, getPosts, generateRec, (req, res) => {
    console.log(req.recUsers)
    res.render('index', {
        user: req.user,
        posts: req.posts,
        recUsers: req.recUsers,
        title: 'Главная страница'
    })
})

// Страница профиля
router.get('/profile', authChecker, getAccountInfo, async (req, res) => {
    const posts = await Post.findAll({
        attributes: ['image', 'comment', 'id'],
        where: {
            user_id: req.user.id
        }
    })
    
    // Форматирование объектов с публикациями
    const postsList = []
    posts.forEach(({ image, comment, id }) => {
        postsList.push({
            image,
            comment,
            id,
        })
    })

    res.render('profile', {
        user: req.user,
        candidate: {
            username: req.user.username,
            nickname: req.user.nickname,
            avatar: req.user.avatar,
            you: true,
        },
        posts: postsList.reverse(),
        postCount: posts.length,
        title: 'Мой прифиль'
    })
})

// Страница чужого профиля
router.get('/:nickname', authChecker, getAccountInfo, userPage, async (req, res) => {

    // Если профиль пользователя
    if(req.user.nickname === req.candidate.nickname) {
        return res.redirect('/profile')
    }

    const posts = await Post.findAll({
        attributes: ['image', 'comment', 'id'],
        where: {
            user_id: req.candidate.id
        }
    })
    
    // Форматирование объектов с публикациями
    const postsList = []
    posts.forEach(({ image, comment, id }) => {
        postsList.push({
            image,
            comment,
            id,
        })
    })

    res.render('profile', {
        user: req.user,
        candidate: {
            username: req.candidate.username,
            nickname: req.candidate.nickname,
            avatar: req.candidate.avatar,
            you: false,
        },
        posts: postsList.reverse(),
        postCount: posts.length,
        title: `Профиль ${req.candidate.nickname}`
    })
})

module.exports = router