const express = require('express')

const router = express.Router()

const mockEmployees = () => {
  const employees = []
  for (let i = 0; i <= 9; i++) {
    const employee = {}
    employee.id = i + 1
    employee.name = `Employee${i + 1}`
    employee.createdAt = new Date()
    employees.push(employee)
  }
  return employees
}

const EMPLOYEE_DATA = mockEmployees()

router.get('/employee/:id', (req, res) => {
  res.json(EMPLOYEE_DATA[req.params.id - 1])
})

router.get('/employees', (req, res) => {
  res.json(EMPLOYEE_DATA)
})

module.exports = router
