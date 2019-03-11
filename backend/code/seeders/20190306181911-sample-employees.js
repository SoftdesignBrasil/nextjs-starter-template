'use strict';

const getRandomInt = (minValue, maxValue) => (
  Math.floor(Math.random() * (maxValue - minValue)) + minValue
)

const mockEmployees = () => {
  const employees = []
  for (let i = 0; i <= 9; i++) {
    employees.push({
      name: `Funcionário ${i + 1}`,
      SectorId: getRandomInt(1,5),
      createdAt: new Date()
    })
  }
  return employees
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
    return queryInterface.bulkInsert('Employees', mockEmployees(), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Employees', null, {});
  }
};
