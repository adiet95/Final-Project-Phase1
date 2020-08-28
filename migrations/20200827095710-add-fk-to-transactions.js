'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Transactions", "MemberId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Members",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }),
      queryInterface.addColumn("Transactions", "ItemId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Items",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Transactions", "MemberId"),
      queryInterface.removeColumn("Transactions", "ItemId")
    ]);
  }
};
