const path = require('path')

module.exports = async (req, res, next) => {
    req.files.image.mv(path.join(__dirname, '../../', 'public', req.uploadFilePath), (err) => {
        if (err) return res.json({ status: 500, message: 'Возникла ошибка при перемещении в папку изображения' })
    })

    next()
}