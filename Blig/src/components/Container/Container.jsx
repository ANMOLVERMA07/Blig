import React from 'react'

// ye ek basic component hota hai jo iske ander ke element ki height,width etc property set krta hai.
function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
  )
}

export default Container