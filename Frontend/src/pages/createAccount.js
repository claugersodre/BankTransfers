import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import CreateAccountService from "./api/accounts/accountsServices"
import GetAllUsers from "./api/user/userServices"
import Button from 'react-bootstrap/Button'

const CreateAccount = ({ data }) => {
  const [userId, setUserId] = useState('')
  const [type, setType] = useState('savings')
  const [amount, setAmount] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch users from the backend when the component mounts
    const fetchData = async () => {
      try {
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
    <div className='row' >
      <h1>Create Account Page</h1>
      <label
        className="col-md-2"
      >Select User
      </label>
      <select
        id="Select User"
        className="col-md-10 mb-1"
        value={userId} onChange={(e) => setUserId(e.target.value)}
        required
      >
        <option value="">Select User</option>
        {users.length > 0 && users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <label
        className="col-md-2"
      >Select Account Type
      </label>
      <select
        className="col-md-10 mb-1"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option
          value="savings"
        >Savings</option>
        <option
          value="checking"
        >Checking</option>
      </select>
      <label
        className="col-md-2"
      >Insert initial amount
      </label>
      <input
        className="col-md-10 mb-1"
        type="number"
        placeholder="Initial Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <Button
        onClick={handleCreateAccount}
        disabled={!amount || !type || !userId}
        variant="primary"
        className="col-md-2 mt-2"
      >Create Account
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
export default CreateAccount
