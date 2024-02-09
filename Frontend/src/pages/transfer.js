import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import TransferrService from './api/transfer/transferServices'
import GetAllUsers from './api/user/userServices'
import Button from 'react-bootstrap/Button'

const Transfer = ({ data }) => {
  const [fromAccountId, setFromAccountId] = useState('')
  const [toAccountId, setToAccountId] = useState('')
  const [amount, setAmount] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [fromAccounts, setFromAccounts] = useState([])

  const fetchData = async () => {
    try {
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
    <div className='row' >
      <h1>Transfer Amount</h1>
      <label
        className="col-md-2"
      >
        From User:
      </label>
      <select
        className="col-md-10 mb-1"
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
      <label
        className="col-md-2"
      >
        From Account:
      </label>
      <select
        className="col-md-10 mb-1"
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
        <div class="row">
          <lablel
            className="col-md-2"
          >
            Current Amount:
          </lablel>
          <label
            className="col-md-1"
          >
            {fromAccounts.filter(e => e.id == fromAccountId).map(e => e.amount)}
            {console.log(
              fromAccountId ? false : true,
              'fromAccountId',
              fromAccountId
            )}
          </label>
        </div>
      )}
      <label
        className="col-md-2"
      >To Account: </label>
      <input
        className="col-md-10 mb-1"
        type='text'
        placeholder='To Account ID'
        value={toAccountId}
        onChange={e => setToAccountId(e.target.value)}
        required
      />
      <lablel
        className="col-md-2"
      >
        Amount
      </lablel>

      <input
        className="col-md-10 mb-1"
        type='number'
        placeholder='Amount'
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <Button
        onClick={handleTransfer}
        disabled={!fromAccountId || !toAccountId || !amount}
        variant="primary"
        className="col-md-2 mt-2"
      >
        Transfer
      </Button>
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
export async function getServerSideProps() {
  const data = await GetAllUsers()
  return { props: { data } }
}
export default Transfer
