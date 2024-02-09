import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import TransferrService from './api/transfer/transferServices'
import GetAllUsers from './api/user/userServices'
import Button from 'react-bootstrap/Button'

const Transfer = () => {
  const [users, setUsers] = useState([])
  const [accounts, setAccounts] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

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


  const clearImput = () => {
    setFromAccountId('')
    setFromAccountId('')
    setSelectedUser(null)
    setToAccountId('')
    setAmount('')
  }


  return (
    <div className='row' >
      <h1>Account's Balance </h1>
      <label
        className="col-md-2"
      >
        Select User:
      </label>
      <select
        className="col-md-10 mb-1"
        value={selectedUser ? selectedUser.id : ''}
        onChange={e => {
          const userId = e.target.value
          const user = users.find(user => user.id === parseInt(userId))
          setSelectedUser(user)
          setAccounts(user ? user.Accounts : null)
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
      {accounts && accounts.map((account) =>
        <div className='row'>
          <label
            className="col-md-2"
          >
            {account.type.toUpperCase()} : {account.id}
          </label>
          <label
            className="col-md-2"
          >
            {account.amount}
          </label>
        </div>
      )}
      <br />
      <div>
        <Link href="/">
          <Button
            style={{ marginLeft: '-11px' }}
            variant="danger"
            className="col-md-2 mt-2"
          >Back to home</Button>
        </Link>
      </div>
    </div>
  )
}

export default Transfer
