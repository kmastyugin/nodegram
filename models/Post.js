const Sequelize = require('sequelize') // Подключение пакета sequelize - от туда будем брать типы данных столбцов
const sequelize = require('../modules/db') // Подключение объекта соединения с БД

module.exports = sequelize.define('Post', {
  id: {  // описание столбца ID
    primaryKey: true, // параметр первичный ключ
    autoIncrement: true, // автоматическое увеличение ID
    type: Sequelize.INTEGER, 
  },
  image: {
    type: Sequelize.STRING(120), 
    allowNull: false
  },
  comment: {
    type: Sequelize.STRING(500),
    allowNull: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})