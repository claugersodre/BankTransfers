import React from 'react'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
const Home = () => {


  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-6'>
          <h1 className='row justify-content-center'>Main Page</h1>
            <Link href="/createUser" passHref className='mb-2 row justify-content-center'>
              <Button variant="primary">Create User</Button>
            </Link>
            <Link href="/createAccount" passHref className='mb-2 row justify-content-center'>
              <Button variant="primary">Create Account</Button>
            </Link>
            <Link href="/deposit" passHref className='mb-2 row justify-content-center'>
              <Button variant="primary">Deposit</Button>
            </Link>
            <Link href="/balance" passHref className='mb-2 row justify-content-center'>
              <Button variant="primary">Balance</Button>
            </Link>
            <Link href="/transfer" passHref className='mb-2 row  justify-content-center'>
              <Button variant="primary">Transfer</Button>
            </Link>
        </div>
      </div>
    </div>

  )
}

export default Home
