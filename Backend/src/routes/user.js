const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Account = require("../models/account")
router.post('/', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.create({ name, password })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
router.get('/', async (req, res) => {
  try {
    const user = await User.findAll()
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
router.get('/useraccount', async (req, res) => {
  try {
    const user = await User.findAll({
      include: Account
      
    })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
