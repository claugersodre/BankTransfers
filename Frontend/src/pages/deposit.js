import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import DepositService from './api/deposit/depositServices'
import GetAllUsers, { GetAllUsersClientSide } from './api/user/userServices'
import Button from 'react-bootstrap/Button'

const Transfer = ({ data }) => {
  const [fromAccountId, setFromAccountId] = useState('')
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
    setSelectedUser(null)
    setAmount('')
  }
  const fetchDataClientSide = async () => {
    const response = await GetAllUsersClientSide()
    console.log(response)
    setUsers(response)
  }
  const handleTransfer = async () => {
    await DepositService(fromAccountId, amount)
    clearImput()
    fetchDataClientSide()
  }

  return (
    <div className='row' >
      <h1>Deposit Amount</h1>
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
        To Account:
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
        disabled={!fromAccountId || !amount}
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
