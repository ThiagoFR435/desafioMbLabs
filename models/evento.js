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
      Evento.belongsTo(models.Usuario);
      Evento.belongsTo(models.Pedido);
      Evento.hasMany(models.Pedido)
    }
  };
  Evento.init({
    titulo: DataTypes.STRING,
    desc: DataTypes.STRING,
    confirmacaopg: DataTypes.STRING,
    data: DataTypes.STRING,
    tipo: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evento',
  });
  return Evento;
};