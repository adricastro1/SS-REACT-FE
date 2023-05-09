import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa"
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Header() {

    const navRef = useRef();
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive-nav")
    }

    return (
        <header className='Header'>
            <nav ref={navRef}>
                <Link to="/" onClick={() => showNavbar()}>Home</Link>
                <LoginButton />
                <LogoutButton />
                <button className='nav-btn nav-close-btn' onClick={showNavbar}><FaTimes /></button>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Header;
