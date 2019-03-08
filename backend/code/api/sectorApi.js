const express = require('express')
const models = require('../models')
const { handleDbError } = require('../utils/errorHandling')
const Op = models.Sequelize.Op

const router = express.Router()

const extractSectorData = (sectorData) => ({
  id: sectorData.id,
  name: sectorData.name,
  type: sectorData.type,
  createdAt: sectorData.createdAt,
  updatedAt: sectorData.updatedAt,
  employees: sectorData.Employees.map(employee => employee.id)
})

router.get('/sector/:id', (req, res) => {
  models.Sector.findOne({
    where: { id: req.params.id },
    include: [ models.Employee ]
  }).then(
    sector => res.json(
      sector ? extractSectorData(sector.get()) : {}
    )
  ).catch(err => handleDbError(err, res))
})

router.get('/sector', (req, res) => {
  models.Sector.findAll().then(sectors => {
    res.json(
      sectors.map(sector => sector.get())
    )
  }).catch(err => handleDbError(err, res))
})

router.post('/sector', (req, res) => {
  let createdSector
  models.sequelizeConnection.transaction((t) => {
    return models.Sector.create(
      {
        name: req.body.name,
        type: req.body.type
      },
      { transaction: t }
    ).then((newSector) => {
      createdSector = newSector
      return models.Employee.update(
        { SectorId: newSector.id },
        {
          where: {
            id: { [Op.in] : req.body.employees }
          },
          transaction: t
        }
      )
    })
  }).then(() => res.json({
      ...createdSector.get(),
      employees: req.body.employees
    })
  ).catch(err => handleDbError(err, res))
})

router.put('/sector', (req, res) => {
  models.sequelizeConnection.transaction((t) => {
    return models.Employee.update(
      { SectorId: req.body.id },
      {
        where: {
          id: { [Op.in] : req.body.employees }
        },
        transaction: t
      }
    ).then(() => {
      return models.Employee.update(
        { SectorId: null },
        {
          where: {
            id: { [Op.notIn] : req.body.employees },
            SectorId: req.body.id
          },
          transaction: t
        }
      )
    }).then(() => {
      return models.Sector.findOne({
        where: { id: req.body.id },
        transaction: t
      })
    }).then((sector) => {
      sector.name = req.body.name
      sector.type = req.body.type
      return sector.save({ transaction: t })
    })
  }).then((sector) => res.json({
      ...sector.get(),
      employees: req.body.employees
    })
  ).catch(err => handleDbError(err, res))
})

router.get('/sectorType', (req, res) => {
  res.json(['Corporativo', 'Departamental'])
})

module.exports = router
