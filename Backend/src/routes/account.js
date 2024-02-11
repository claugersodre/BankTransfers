const express = require('express')
const router = express.Router()
const Account = require('../models/account')

router.post('/', async (req, res) => {
  try {
    const { type, amount, userId } = req.body
    const account = await Account.create({ type, amount, userId: userId * 1 })
    res.json(account)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/transfer', async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body

    // Retrieve accounts
    const fromAccount = await Account.findByPk(fromAccountId * 1)
    const toAccount = await Account.findByPk(toAccountId * 1)

    // Ensure the transfer is valid
    if (fromAccount && toAccount && fromAccount.amount >= amount) {
      await fromAccount.decrement('amount', { by: amount })
      await toAccount.increment('amount', { by: amount })
      res.json({ message: 'Transfer successful' })
    } else {
      res.status(400).json({ error: 'Invalid transfer' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
router.post('/deposit', async (req, res) => {
  const { toAccountId, amount } = req.body
  if ((typeof toAccountId == 'undefind') && amount < 0) {
    res.status(400).json({ error: 'Invalid transfer' })
  }
  try {
    // Retrieve accounts
    const toAccount = await Account.findByPk(toAccountId * 1)

    await toAccount.increment('amount', { by: amount })
    res.json({ message: 'Transfer successful' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
