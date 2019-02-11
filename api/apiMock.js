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

router.get('/employees', (req, res) => {
  res.json(mockEmployees())
})

module.exports = router
