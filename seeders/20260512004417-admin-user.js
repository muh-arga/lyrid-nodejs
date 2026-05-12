"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Administrator",
        username: "admin",
        password: bcrypt.hashSync("admin123", 10),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User",
        username: "user",
        password: bcrypt.hashSync("user123", 10),
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
