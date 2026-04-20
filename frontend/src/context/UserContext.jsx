import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        const saved = localStorage.getItem('userData');
        return saved ? JSON.parse(saved) : {
            nombre: "Usuario Invitado",
            rol: "Consultor",
            user_type: null,
            iniciales: "U",
            foto: null
        };
    });

    const updateUserData = (newData) => {
        setUserData((prev) => {
            const updated = { ...prev, ...newData };
            localStorage.setItem('userData', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);