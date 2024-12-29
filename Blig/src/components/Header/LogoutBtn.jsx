import React from 'react'

// isse hum logout method dispatch krdenge
import { useDispatch } from 'react-redux'

// authService hume logout krne ki service dega
import authService from '../../appwrite/config'
// or reducer ka logout uski state ko change krke uska status change krdega
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch();
  // jab bhi logout button pe click hoega to ye func logout service dega
  const handleLogout = () => {
    // jyadatar chize authService mei ek promise h
    authService.logout()
               .then(() => dispatch(logout()))  // logout hone ke baad store mei logout call krke uski state bhi change krdenge.
  } 
  return (
    <button
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={() => handleLogout()}
    >Logout</button>
  )
}

export default LogoutBtn