// src/hooks/useUser.js
import { useContext } from 'react';
import { UserContext } from './UserContext'; // Adjust the path as necessary

export const useUser = () => {
    return useContext(UserContext);
};
