const Sequelize = require('sequelize') // Подключение пакета sequelize - от туда будем брать типы данных столбцов
const sequelize = require('../modules/db') // Подключение объекта соединения с БД

module.exports = sequelize.define('Token', {
  id: {  // описание столбца ID
    primaryKey: true, // параметр первичный ключ
    autoIncrement: true, // автоматическое увеличение ID
    type: Sequelize.INTEGER, // тип хранимых значений
  },
  user_id: {
    type: Sequelize.INTEGER, // тип хранимых значений
    allowNull: false
  },
  token: {
    type: Sequelize.STRING(36),
    allowNull: false
  },
})