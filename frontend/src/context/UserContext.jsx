import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        nombre: "Sr. Walter",
        rol: "Desarrollador de Software",
        iniciales: "W",
        foto: null
    });

    const updateUserData = (newData) => {
        setUserData((prev) => ({ ...prev, ...newData }));
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);