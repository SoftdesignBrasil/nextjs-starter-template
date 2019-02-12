const express = require('express')

const router = express.Router()

const mockEmployees = () => {
  const employees = []
  for (let i = 0; i <= 9; i++) {
    const employee = {
      id: i + 1,
      name: `Employee${i + 1}`,
      createdAt: new Date()
    }
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

router.post('/employee', (req, res) => {
  const employeeIndex = req.body.id - 1
  EMPLOYEE_DATA[employeeIndex].name = req.body.name
  EMPLOYEE_DATA[employeeIndex].createdAt = new Date()
  res.sendStatus(200)
})

module.exports = router
