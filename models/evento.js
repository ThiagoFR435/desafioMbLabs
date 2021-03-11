'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Evento.init({
    titulo: DataTypes.STRING,
    desc: DataTypes.STRING,
    tipo: DataTypes.STRING,
    foto: DataTypes.STRING,
    valor: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Evento',
  });
  return Evento;
};