const Sequelize = require('sequelize') // Подключение пакета sequelize
module.exports = new Sequelize('project', 'root', '', {
  host: 'localhost', // Адрес сервера
  dialect: 'mysql' // название субд
})