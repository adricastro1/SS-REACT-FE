import 'rsuite/dist/rsuite-no-reset.min.css';
import './Nav.css'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, ButtonToolbar } from 'rsuite';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';


function Header() {
    return (
            <Nav className='Nav'>
                <Nav.Item>
                    <Link to="/" className='home-title'>Sofia's Styling</Link>
                </Nav.Item>
                <div className='nav-right'>
                <Nav.Item>
                    <Link to="/contact"  className='home-link'>Contact Us</Link>
                </Nav.Item>
                    <LoginButton />
                    <LogoutButton />
                </div>
            </Nav>
    );
}

export default Header;
