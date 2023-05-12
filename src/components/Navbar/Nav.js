import 'rsuite/dist/rsuite-no-reset.min.css';
import './Nav.css'
import { Link } from 'react-router-dom'
import { Button, Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';


function Header() {
    return (
        <Navbar appearance="default" className='Navbar'>
            <Nav pullRight className='Nav'>
                <Nav.Item icon={<HomeIcon />} >
                    <Link to="/" className='home-link'>Home</Link>
                </Nav.Item>
                <LoginButton />
                <LogoutButton />
            </Nav>
        </Navbar>
    );
}

export default Header;
