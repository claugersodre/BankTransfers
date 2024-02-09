import axios from 'axios'
import { toast } from 'react-toastify'

export default async function GetAllUsers(req, res) {
  try {
    // Call form server side inside the container
    const response = await axios.get(`http://backend:3001/users/useraccount`)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    return {}
  }
}
export async function GetAllUsersClientSide(req, res) {
  try {
    // Call form server side inside the container
    const response = await axios.get(`http://localhost:3001/users/useraccount`)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    return {}
  }
}
export async function CreateUserService(name, password) {
  console.log(name, password)
  try {
    // Call from client side webBrownser
    await axios.post(`http://localhost:3001/users`, { name, password })
    toast.success('User Created')
  } catch (error) {
    console.error('Error creating user:', error)
    toast.error('Can not Create an User')
  }
}
