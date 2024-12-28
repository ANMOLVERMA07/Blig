import { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux'
import './App.css'

import { Header,Footer} from './components/index'

// Create account,getUser,delete User wali service
import authService from './appwrite/auth';

// login from authSlice
import {login,logout} from './store/authSlice'

function App() {
  // ek loading state bnana acha hota hai , kyunki jaise hi application mount hota hai to vo kuch data fetch krega backend se to usme thoda time lag skta hai isley ek loading state run krti rhegi jab tk fetch nhi hota
  const [loading,setLoading] = useState(true);

  const dispatch = useDispatch();

  // jaise hi application mount ho ek useEffect lo or usse pucho ki app loggedIn ho ya nhi
  useEffect(() => {
    authService.getCurrentStatus()  // userdata return krega
               .then((userData) => {
                // hume isme userData milgya ab ise hume authslice ke login ko dispatch krna pdega jisse action ke payload mei userData ja paye
                   if(userData){ // agr userdata mile to dispatch krdo
                    // authslice ke login ko userdata bhejdiya jisse action ke payload mei userdata chla jaye
                    dispatch(login({userData}))
                   }else{ // agr user nhi mila h to logout krva do
                    dispatch(logout());
                   }
               })
               .finally(() => setLoading(false));   //  jab sara kaam hojaye to loading ko false krdenge
                 },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          Todo  {/* <Outlet/> */}
        </main>
        <Footer />
      </div>
    </div>

  ) : null
}

export default App
