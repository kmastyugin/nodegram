const { Router } = require('express')
const router = Router()
// Формирование имени файла
const setFileName = require('../middlewares/upload/setFileName')
// Добавление файла в базу данных
const addImagePostToDb = require('../middlewares/upload/addImagePostToDb')
// Получение информации об аккаунте
const getAccountInfo = require('../middlewares/auth/getAccountInfo')
// Добавление файла в папку проекта
const saveFileToPath = require('../middlewares/upload/saveFileToPath')
// Изменить аватар профиля
const addAvatarToDb = require('../middlewares/upload/addAvatarToDb')

// Добавление публикации
router.post('/', getAccountInfo, setFileName, addImagePostToDb, saveFileToPath, (req, res) => {
    res.redirect('/profile')
})

// Изменение аватара
router.post('/avatar', getAccountInfo, setFileName, addAvatarToDb, saveFileToPath, (req, res) => {
    res.redirect('/profile')
})


module.exports = router