import React from 'react'

function Button({
    children,      // label shown on button
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = "text-white",
    className = '',      // user apne hisaab se classes de skta hai, nhi dega to empty hi rhengi ( Good Pratice )
    ...props    // Agr kuch or dega to vo bhi is props mei aa jaegi
}) { 

  return (
    <button
    className={`${className} ${bgColor} ${textColor} px-4 py-2 rounded-lg `}
    {...props}
    >{children}</button>
  )
  
}

export default Button