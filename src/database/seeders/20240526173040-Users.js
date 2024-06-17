/* eslint-disable @typescript-eslint/no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('users', [
      {
        id: '6677fd9a-3916-4586-8788-7a38f1c2a8c3',
        first_name: 'Admin',
        last_name: 'Admin',
        email: 'admin@admin.com',
        phone: '0784647287',
        password:
          '$2a$10$HRzDgICLOe/0IZbcL84UqOyS3.IRcIUI1KDmFrDjKOeIL1LfgAXie' /** password: password */,
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
