import './Nav.css'
import { useState, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef();

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    const navClass = isNavOpen ? 'block' : 'hidden';

    return (
        <header className="flex items-center justify-between px-8 py-4 shadow-md bg-gray-100">
            <nav ref={navRef} className="w-full md:w-auto flex-grow" >
                <div className="flex items-center justify-between w-full flex-grow">
                    <div>
                        <Link
                            to="/"
                            onClick={closeNav}
                            className="home-title">
                            Sofia's Styling
                        </Link>
                    </div>
                    <div className="flex items-center text-right">
                        <div className="md:hidden">
                            <button
                                className="text-gray-800 hover:text-gray-600"
                                onClick={toggleNav}>
                                {isNavOpen ? <FaTimes /> : <FaBars />}
                            </button>
                        </div>
                        <div className={`ml-auto hidden md:flex items-center space-x-4 fle ${navClass}`}>
                            <Link
                                to="/contact"
                                onClick={closeNav}
                                className="home-link">
                                Contact Us
                            </Link>
                            <div className='authentication'>
                                <LoginButton />
                                <LogoutButton />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`mt-4 ${navClass} md:hidden`}>
                    <Link
                        to="/contact"
                        onClick={closeNav}
                        className="block mt-4 text-gray-800 hover:text-gray-600 font-bold text-lg">
                        Contact Us
                    </Link>
                    <div className="mt-4">
                        <LoginButton />
                        <LogoutButton />
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;