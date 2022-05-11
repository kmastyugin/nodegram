const { Router } = require('express')
const router = Router()

// Проверка данных
const userChecker = require('../middlewares/auth/userChecker')
// Установка токена
const setToken = require('../middlewares/auth/setToken')
// Удаление токена
const deleteToken = require('../middlewares/auth/deleteToken')
// Проверка на отсутствие токена
const authCheckerByAuth = require('../middlewares/auth/authCheckerByAuth')

// Страница регистрации
router.get('/', authCheckerByAuth, (req, res) => {
    res.render('auth', { layout: 'clear', error: true, message: req.query.message, title: 'Авторизация' })
})

// Запрос на авторизацию
router.post('/', authCheckerByAuth, userChecker, setToken, async (req, res) => {
    res.redirect('/')
})

// Выход
router.get('/logout', deleteToken)



module.exports = router