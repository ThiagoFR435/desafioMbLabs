'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idEvento: {
        type: Sequelize.INTEGER,
        references:{
          model:'Eventos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete:'cascade'
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references:{
          model:'Usuarios',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete:'cascade'
      },
      confirmacaopg: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedidos');
  }
};