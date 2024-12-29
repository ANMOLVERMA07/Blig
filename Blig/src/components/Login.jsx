import React,{ useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authSliceLogin } from '../store/authSlice'
import { Button,Input,Logo} from  './index'
import { useDispatch } from 'react-redux'
import service from '../appwrite/auth'
import {useForm} from "react-hook-form"
import authService from '../appwrite/auth'

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // react hook form ke docs mei aise hi use kr rkha hai
    const { register,handleSubmit } = useForm();

    const [error,setError] = useState('');

    // is login method ko hum form ke submit hone pe handle submit method mei pass krenge.(handleSubmit ek method accept krta hai jis s hum submit handle krte h form ka)
    const login = async(data) => {
        // jaise hi login set kro to errors ko empty out krdo.
        setError("");

        try {
            // hum ise ek session naam ke variable mei store kr lenge
            const session = await authService.login(data);

            // agr session hoga to user login ho chuka hai wrna nhi hua hai.
            if(session){
                // an hum authservice ki help se user data nikal lenge
                const userData = await authService.getCurrentStatus();
                // agr user data aata hai to use dispatch kra denge authSlice ke login ko jis s store mei status update ho ske
                if(userData) dispatch(authSliceLogin(userData));
                // jab login krva hi diya h to use navigate krdo homepage pe
                navigate('/');
            }

        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                
                <Input 
                label = "Email"
                placeholder = "Enter your Email..."
                type = "email"
                {...register("email", {
                                    required : true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                    }
                })}
                />

                <Input 
                label = "Password"
                placeholder = "Enter your password"
                type = "password"
                {...register("password",{
                                        required : true,
                })}
                />

                <Button 
                children = "Sign in"
                type = "submit"
                className = "w-full"
                />

            </div>
        </form>

        </div>
    </div>
  )
}

export default Login