module.exports = (req, res, next) => {
    const { password, password_second } = req.body

    // Проверка на неодинаковые пароли
    if (password !== password_second) {
        const message = encodeURIComponent('Пароли не совпадают')
        return res.redirect(`/register?message=${message}`)
    }
    // Проверка на длину пароля
    else if (password.length < 5 || password.length > 35) {
        const message = encodeURIComponent('Пароли должен быть от 5 до 35 символов')
        return res.redirect(`/register?message=${message}`)
    }

    next()
}