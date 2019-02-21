const express = require('express')

const router = express.Router()

const mockEmployees = () => {
  const employees = []
  for (let i = 0; i <= 9; i++) {
    const employee = {
      id: i + 1,
      name: `Funcionário ${i + 1}`,
      createdAt: new Date()
    }
    employees.push(employee)
  }
  return employees
}

const createNewEmployee = (name) => {
  const employee = {
    id: EMPLOYEE_DATA.length + 1,
    name: name,
    createdAt: new Date()
  }

  return employee
}

const EMPLOYEE_DATA = mockEmployees()

router.get('/employee/:id', (req, res) => {
  res.json(EMPLOYEE_DATA[req.params.id - 1])
})

router.get('/employee', (req, res) => {
  res.json(EMPLOYEE_DATA)
})

router.put('/employee', (req, res) => {
  const employeeIndex = req.body.id - 1
  EMPLOYEE_DATA[employeeIndex].name = req.body.name
  EMPLOYEE_DATA[employeeIndex].createdAt = new Date()
  res.json(EMPLOYEE_DATA[employeeIndex])
})

router.post('/employee', (req, res) => {
  EMPLOYEE_DATA.push(createNewEmployee(req.body.name))
  const employeeIndex = EMPLOYEE_DATA.length - 1
  res.json(EMPLOYEE_DATA[employeeIndex])
})

module.exports = router
