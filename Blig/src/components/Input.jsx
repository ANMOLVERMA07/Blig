import React,{useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref ){

    const id = useId();   // this will give a unique id every time

    return (
        <div className='w-full'>
            {label && <label 
                      className='block mb-1'
                      htmlFor={id}
                      >{label}</label>}

                      <input 
                      type={type}
                      className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
                      ref={ref}
                      id={id}
                      {...props}
                      />
        </div>
    )
})

export default Input