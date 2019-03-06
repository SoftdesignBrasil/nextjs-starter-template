'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('Sector', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Sector.associate = function(models) {
    // associations can be defined here
    Sector.hasMany(models.Employee);
  };
  return Sector;
};