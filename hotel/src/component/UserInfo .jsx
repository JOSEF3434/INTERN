import { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust path as necessary

const UserInfo = () => {
    const { user } = useContext(UserContext); // Access user from context

    if (!user) return null; // Don't render if no user

    return (
        <div className="user-info">
            <h2>User Information</h2>
            <p>Email: {user.email}</p>
            {/* Add any other user information you want to display */}
        </div>
    );
};

export default UserInfo;
