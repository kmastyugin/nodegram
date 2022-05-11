const Sequelize = require('sequelize') // Подключение пакета sequelize - от туда будем брать типы данных столбцов
const sequelize = require('../modules/db') // Подключение объекта соединения с БД

module.exports = sequelize.define('Comment', {
  id: {  // описание столбца ID
    primaryKey: true, // параметр первичный ключ
    autoIncrement: true, // автоматическое увеличение ID
    type: Sequelize.INTEGER, 
  },
  comment: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  post_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
})