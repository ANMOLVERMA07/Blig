import React from 'react'
import { Container,Logo,LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  // useSelector hume state ka access deta h jisse hum current user ka status puch lenge or uske hisaab se aage ke kaam krenge
  const authStatus = useSelector((state) => state.auth.status);   // bteage ki login h ya nhi

  // agr kisi ko forcefully khi navigate krvana ho to useNavigate ka use krnge
  const navigate = useNavigate();

  // navItems ek array rhega kyunki agr nav bar mei koi nya item aaega to normally hume ek or button likhna pdega , pr yha hum sirf array mei add krke uska use krlenge
  const navItems = [    // Good Pratice
    {
      name: 'Home',   // name ki help ke hum jb map lgaenge to ise key ki trh le lenge
      slug: "/",      // ye hume btaega ki kha navigate krna hai
      active: true    // ispe hum condition lgake show kr skte h ki ye path dikhana h ya nhi
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,   // login to vohi kr paega n jo currenly loggedIn nhi hoga
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,   // Signup bhi vohi krega jo abhi logout hai
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,  // posts ka access use denge jo login ho chuka hai
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,   // post add krne ka access use denge jo login ho chuka hai
  },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>     
          <div className='mr-4'>
            <Link to="/">
            <Logo width='70px'/>
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full '
                >{item.name}</button>
              </li>
              ) : null
            )}

           {authStatus && (
               <li>
                  <LogoutBtn/>
               </li>
           )}


          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header