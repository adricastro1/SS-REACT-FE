import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (

            <Button appearance="primary" onClick={() => loginWithRedirect()}>Log In</Button>
        )
    )
};

export default LoginButton;