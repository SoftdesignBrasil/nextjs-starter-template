const express = require('express')

const router = express.Router()

const mockSectors = () => {
  const sectors = []
  for (let i = 0; i <= 4; i++) {
    const sector = {
      id: i + 1,
      name: `Setor ${i + 1}`,
      type: i % 2 ? 'Corporativo' : 'Departamental',
      employees: [getRandomInt(1,10)]
    }
    sectors.push(sector)
  }
  return sectors
}

const getRandomInt = (minValue, maxValue) => (
  Math.floor(Math.random() * (maxValue - minValue)) + minValue
)

const createNewSector = (name, type, employees) => {
  const sector = {
    id: SECTOR_DATA.length + 1,
    name,
    type,
    employees
  }
  return sector
}

const SECTOR_DATA = mockSectors()

router.get('/sector/:id', (req, res) => {
  res.json(SECTOR_DATA[req.params.id - 1])
})

router.get('/sector', (req, res) => {
  res.json(SECTOR_DATA)
})

router.post('/sector', (req, res) => {
  SECTOR_DATA.push(
    createNewSector(req.body.name, req.body.type, req.body.employees)
  )
  sectorIndex = SECTOR_DATA.length - 1
  res.json(SECTOR_DATA[sectorIndex])
})

router.put('/sector', (req, res) => {
  let sectorIndex = req.body.id - 1
  SECTOR_DATA[sectorIndex].name = req.body.name
  SECTOR_DATA[sectorIndex].type = req.body.type
  SECTOR_DATA[sectorIndex].employees = req.body.employees
  res.json(SECTOR_DATA[sectorIndex])
})

router.get('/sectorType', (req, res) => {
  res.json(['Corporativo', 'Departamental'])
})

module.exports = router
