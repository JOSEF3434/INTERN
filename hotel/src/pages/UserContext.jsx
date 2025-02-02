// src/context/UserContext.js
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initially, no user is logged in

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Define PropTypes for UserProvider
UserProvider.propTypes = {
    children: PropTypes.node.isRequired, // Specify that children is required
};
