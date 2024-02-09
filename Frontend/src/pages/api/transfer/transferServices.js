import axios from 'axios'
import { toast } from 'react-toastify'

export default async function TransferrService (
  fromAccountId,
  toAccountId,
  amount
) {
  try {
    const response = await axios.post(
      'http://localhost:3001/accounts/transfer',
      {
        fromAccountId,
        toAccountId,
        amount
      }
    )
    toast.success('Transferring amount success')
  } catch (error) {
    console.error('Error transferring amount:', error)
    toast.error('Error transferring amount')
  }
}
