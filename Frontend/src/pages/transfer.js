import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import TransferrService from './api/transfer/transferServices'
import GetAllUsers from './api/user/userServices'

const Transfer = () => {
  const [fromAccountId, setFromAccountId] = useState('')
  const [toAccountId, setToAccountId] = useState('')
  const [amount, setAmount] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [fromAccounts, setFromAccounts] = useState([])
  
  const fetchData = async () => {
    try {
      const data = await GetAllUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // Filter accounts based on selected user
    if (selectedUser) {
      setFromAccounts(selectedUser.Accounts)
    }
  }, [selectedUser])
  const clearImput = () => {
    setFromAccountId('')
    setFromAccountId('')
    setSelectedUser(null)
    setToAccountId('')
    setAmount('')
  }
  const handleTransfer = async () => {
    await TransferrService(fromAccountId, toAccountId, amount)
    clearImput()
    fetchData()
  }

  return (
    <div>
      <h1>Transfer Amount</h1>
      <label>From User:</label>
      <select
        value={selectedUser ? selectedUser.id : ''}
        onChange={e => {
          const userId = e.target.value
          const user = users.find(user => user.id === parseInt(userId))
          setSelectedUser(user)
        }}
        required
      >
        <option value=''>Select User ID</option>
        {users.length > 0 &&
          users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
      </select>
      <label>From Account:</label>
      <select
        value={fromAccountId}
        onChange={e => setFromAccountId(e.target.value)}
        required
      >
        <option value=''>Select Account</option>
        {fromAccounts.map(account => (
          <option key={account.id} value={account.id}>
            {account.id} - {account.type} (Owner:{' '}
            {selectedUser ? selectedUser.name : ''})
          </option>
        ))}
      </select>
      {fromAccountId && (
        <div>
          <label>
            Current Amount:{' '}
            {fromAccounts.filter(e => e.id == fromAccountId).map(e => e.amount)}
            {console.log(
              fromAccountId ? false : true,
              'fromAccountId',
              fromAccountId
            )}
          </label>
        </div>
      )}
      <label>To Account: </label>
      <input
        type='text'
        placeholder='To Account ID'
        value={toAccountId}
        onChange={e => setToAccountId(e.target.value)}
        required
      />
      <input
        type='number'
        placeholder='Amount'
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <button
        onClick={handleTransfer}
        disabled={!fromAccountId || !toAccountId || !amount}
      >
        Transfer
      </button>
      <br />
      <div>
        <Link href='/'>
          <p>Back to home</p>
        </Link>
      </div>
    </div>
  )
}

export default Transfer
