const Sequelize = require('sequelize') // Подключение пакета sequelize - от туда будем брать типы данных столбцов
const sequelize = require('../modules/db') // Подключение объекта соединения с БД

module.exports = sequelize.define('Like', {
  id: {  // описание столбца ID
    primaryKey: true, // параметр первичный ключ
    autoIncrement: true, // автоматическое увеличение ID
    type: Sequelize.INTEGER, 
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  post_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})