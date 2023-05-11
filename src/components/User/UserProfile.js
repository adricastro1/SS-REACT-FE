import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    
    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div>
                <h2>{user.given_name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
};

export default Profile;