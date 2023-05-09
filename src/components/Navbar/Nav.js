import { useRef } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"

function Header() {

  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive-nav")
  }

  return (
    <header className='Header'>
      <nav ref={navRef}>
        <Link to="#home" onClick={() => showNavbar()}>
          <h3>HOME</h3>
        </Link>

        <Link to="#about" onClick={() => showNavbar()}>
          <h3>ABOUT</h3>
        </Link>

        <Link to="#projects" onClick={() => showNavbar()}>
          <h3>PROJECTS</h3>
        </Link>

        <Link to="#contact" onClick={() => showNavbar()}>
          <h3>CONTACT INFO</h3>
        </Link>
        <button className='nav-btn nav-close-btn' onClick={showNavbar}>
          <FaTimes/>
        </button>
      </nav>
      <button className='nav-btn' onClick={showNavbar}>
        <FaBars/>
      </button>
    </header>
  );
}

export default Header;
