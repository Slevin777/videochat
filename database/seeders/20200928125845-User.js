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

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Vital',
        email: 'new@email.com',
        nickName: 'airon',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user2',
        email: 'user@email.com',
        nickName: '',
        password: '123456',
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

    await queryInterface.bulkDelete('Users', null, {});
  },
};
