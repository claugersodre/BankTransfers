import React from 'react'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
const Home = () => {


  return (
    <div >
      <h1>Main Page</h1>
      <div className='mb-2'>
        <Link href="/createUser" passHref>
          <Button variant="primary">Create User</Button>
        </Link>
      </div>
      <div className='mb-2'>
        <Link href="/createAccount">
          <Button variant="primary">Create Account</Button>
        </Link>
      </div>
      <div className='mb-2'>
        <Link href="/balance" passHref>
          <Button variant="primary">Balance</Button>
        </Link>
      </div>
      <div className='mb-2'>
        <Link href="/transfer">
          <Button variant="primary">Transfer</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
