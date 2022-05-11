const Sequelize = require('sequelize') // Подключение пакета sequelize - от туда будем брать типы данных столбцов
const sequelize = require('../modules/db') // Подключение объекта соединения с БД

module.exports = sequelize.define('User', {
  id: {  // описание столбца ID
    primaryKey: true, // параметр первичный ключ
    autoIncrement: true, // автоматическое увеличение ID
    type: Sequelize.INTEGER, // тип хранимых значений
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  nickname: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING(15),
    allowNull: true
  },
  avatar: {
    type: Sequelize.STRING(120),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
}, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
})