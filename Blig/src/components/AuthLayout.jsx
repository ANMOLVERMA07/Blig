import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


// AuthLayout simply ek protection wali chiz h jo user ke auth status ke hisaab se use allow krti h ki vo kha ja skta h or kha nhi
export default function AuthLayout({children}) {

    const [loader,setLoader] = useState(true)
    const navigate = useNavigate();

    // useSelector mei state ki help se hum pta lga lenge ki user abhi loggedin h ya nhi
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if(!authStatus){
            navigate("/login")
        }else{
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate])    // agr authStatus mei kuch bhi change hoga to useEffect chalke fir se check hoega ki user ko kis kis chiz ka access dena h.
  return loader ? <h1>Loading...</h1> : <>{children}</>
}
