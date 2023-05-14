import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button className="btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </Button>
        )
    );
};

export default LogoutButton;