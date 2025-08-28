import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const link = 'px-3 py-2 rounded hover:bg-blue-500 hover:text-white'
  const active = 'text-white font-semibold bg-white-700'
  
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-blue-600 text-white">
      <div className="text-xl font-bold">My Website</div>
      <ul className="flex gap-3">
        <li>
          <NavLink 
            to="/" 
            className={({isActive}) => `${link} ${isActive ? active : ''}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({isActive}) => `${link} ${isActive ? active : ''}`}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({isActive}) => `${link} ${isActive ? active : ''}`}
          >
            Contact
          </NavLink>
          <NavLink 
            to="/youtube" 
            className={({isActive}) => `${link} ${isActive ? active : ''}`}
          >
            youtube
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
