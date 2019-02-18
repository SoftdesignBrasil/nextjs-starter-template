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

router.get('/employees', (req, res) => {
  res.json(EMPLOYEE_DATA)
})

router.post('/employee', (req, res) => {
  let employeeIndex
  if(req.body.id) {
    employeeIndex = req.body.id - 1
    EMPLOYEE_DATA[employeeIndex].name = req.body.name
    EMPLOYEE_DATA[employeeIndex].createdAt = new Date()
  } else {
    EMPLOYEE_DATA.push(createNewEmployee(req.body.name))
    employeeIndex = EMPLOYEE_DATA.length - 1
  }

  res.json(EMPLOYEE_DATA[employeeIndex])
})

module.exports = router
