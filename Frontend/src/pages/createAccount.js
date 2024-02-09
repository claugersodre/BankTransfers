import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import CreateAccountService from './api/accounts/accountsServices'
import GetAllUsers from './api/user/userServices'

const CreateAccount = () => {
  const [userId, setUserId] = useState('')
  const [type, setType] = useState('savings')
  const [amount, setAmount] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch users from the backend when the component mounts
    const fetchData = async () => {
      try {
        const data = await GetAllUsers()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchData()
  }, [])

  const clear = () => {
    setUserId('')
    setAmount('')
  }
  const handleCreateAccount = async () => {
    await CreateAccountService(userId, type, amount)
    clear()
  }

  return (
    <div>
      <h1>Create Account</h1>
      <select value={userId} onChange={e => setUserId(e.target.value)}>
        <option value=''>Select User ID</option>
        {users.length > 0 &&
          users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
      </select>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value='savings'>Savings</option>
        <option value='checking'>Checking</option>
      </select>
      <input
        type='number'
        placeholder='Initial Amount'
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handleCreateAccount}>Create Account</button>
      <br />
      <div>
        <Link href='/'>
          <p>Back to home</p>
        </Link>
      </div>
    </div>
  )
}

export default CreateAccount
