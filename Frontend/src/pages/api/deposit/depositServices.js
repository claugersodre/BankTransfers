import axios from 'axios'
import { toast } from 'react-toastify'

export default async function DepositService (
  fromAccountId,
  amount
) {
  try {
    const response = await axios.post(
      'http://localhost:3001/accounts/deposit',
      {
        toAccountId:fromAccountId,
        amount
      }
    )
    toast.success('Depositing amount success')
  } catch (error) {
    console.error('Error Depositing amount:', error)
    toast.error('Error Depositing amount')
  }
}
