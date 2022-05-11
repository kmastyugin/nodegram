const { Router } = require('express')
const router = Router()
const User = require('../models/User')

// Проверка пароля
const passwordChecker = require('../middlewares/register/passwordChecker')
// Проверка логина
const loginChecker = require('../middlewares/register/loginChecker')
// Кэширование пароля
const cryptPassword = require('../middlewares/register/cryptPassword')
// Проверка на отсутствие токена
const authCheckerByAuth = require('../middlewares/auth/authCheckerByAuth')

// Страница регистрации
router.get('/', authCheckerByAuth, (req, res) => {
    res.render('register', { layout: 'clear', error: true, message: req.query.message, title: 'Регистрация' })
})

router.post('/', authCheckerByAuth, passwordChecker, loginChecker, cryptPassword, async (req, res) => {
    const { username, nickname, password } = req.body
    
    await User.create({
        username,
        nickname,
        password,
        avatar: `https://eu.ui-avatars.com/api/?name=${nickname}&size=250`,
    })

    res.redirect('/auth')
})

module.exports = router