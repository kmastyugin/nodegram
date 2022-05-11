const { Router } = require('express')
const router = Router()

// Получение информации об аккаунте
const getAccountInfo = require('../middlewares/auth/getAccountInfo')


// Добавление публикации
router.post('/', getAccountInfo, setFileName, addImagePostToDb, saveFileToPath, (req, res) => {
    res.redirect('/profile')
})

// Изменение аватара
router.post('/avatar', getAccountInfo, setFileName, addAvatarToDb, saveFileToPath, (req, res) => {
    res.redirect('/profile')
})


module.exports = router