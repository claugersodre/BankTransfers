import axios from 'axios'
import { toast } from 'react-toastify'

export default async function CreateAccountService(userId, type, amount) {
  try {
    const response = await axios.post('http://localhost:3001/accounts', { userId, type, amount })
    toast.success('Account created')
  } catch (error) {
    console.error('Error creating account:', error)
    toast.error('Can not Create an Account')
  }
}
