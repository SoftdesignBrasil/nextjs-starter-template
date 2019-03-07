const express = require('express')
const models = require('../models')
const { handleDbError } = require('../utils/errorHandling')

const router = express.Router()

router.get('/employee/:id', (req, res) => {
  models.Employee.findOne({
    where: { id: req.params.id }
  }).then(
    employee => res.json(
      employee ? employee.get() : {}
    )
  ).catch(err => handleDbError(err, res))
})

router.get('/employee', (req, res) => {
  models.Employee.findAll().then(employees => {
    res.json(
      employees.map(employee => employee.get())
    )
  }).catch(err => handleDbError(err, res))
})

router.put('/employee', (req, res) => {
  models.Employee.findOne({
    where: { id: req.body.id }
  }).then(employee => {
    employee.name = req.body.name
    return employee.save()
  }).then((employee) => {
    res.json(employee.get())
  }).catch(err => handleDbError(err, res))
})

router.post('/employee', (req, res) => {
  models.Employee.create({
    name: req.body.name
  }).then(
    newEmployee => res.json(newEmployee.get())
  ).catch(err => handleDbError(err, res))
})

module.exports = router
