import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


// AuthLayout simply ek protection wali chiz h jo user ke auth status ke hisaab se use allow krti h ki vo kha ja skta h or kha nhi
export default function AuthLayout({children,authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authentication])    // agr authStatus mei kuch bhi change hoga to useEffect chalke fir se check hoega ki user ko kis kis chiz ka access dena h.
  return loader ? <h1>Loading...</h1> : <>{children}</>
}
