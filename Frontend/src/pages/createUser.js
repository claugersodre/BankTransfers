import Link from 'next/link'
import React, { useState } from 'react'
import { CreateUserService } from "./api/user/userServices"
import Button from 'react-bootstrap/Button'

const CreateUser = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const createUser = async () => {
    CreateUserService(name, password)
  }

  return (
    <div className='row' >
      <h1>Create User</h1>
      <label className="col-md-2">User name</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="col-md-10 mb-1"
      />
      <label className="col-md-2">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="col-md-10 mb-1"
      />
      <Button
        onClick={createUser}
        className="col-md-4 mt-2 "
        variant="primary"
      >
        Create User
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
    </div >
  )
}

export default CreateUser
