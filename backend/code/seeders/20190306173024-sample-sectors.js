'use strict';

const mockSectors = () => {
  const sectors = []
  for (let i = 0; i <= 4; i++) {
    sectors.push({
      name: `Setor ${i + 1}`,
      type: i % 2 ? 'Corporativo' : 'Departamental',
      createdAt: new Date()
    })
  }
  return sectors
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Sectors', mockSectors(), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Sectors', null, {});
  }
};
