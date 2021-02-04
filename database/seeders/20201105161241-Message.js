'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Messages', [
      {
        roomId: 1,
        userId: 1,
        message: 'Hello, hi are you?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roomId: 1,
        userId: 2,
        message: 'Hi! Fine',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roomId: 1,
        userId: 2,
        message: 'What about you?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
