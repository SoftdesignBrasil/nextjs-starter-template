const express = require('express')

const router = express.Router()

const mockEmployees = () => {
  const employees = []
  for (let i = 0; i <= 9; i++) {
    const employee = {}
    employee.name = `Employee${i}`
    employee.createdAt = new Date()
    employees.push(employee)
  }
  return employees
}

router.get('/employees', (req, res) => {
  res.json(mockEmployees())
})

module.exports = router
