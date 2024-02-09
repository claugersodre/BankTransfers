const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Account = require("../models/account")
const hashPassword = require("../utils/hashPassord")


router.post('/', async (req, res) => {
  try {
    const { name, password } = req.body
    console.log(name, password)
    let hashedPassword = await hashPassword(password)
    const user = await User.create({ name, password: hashedPassword })
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
