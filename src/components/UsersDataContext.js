// UsersDataContext.js (別ファイルで作成)
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UsersDataContext = createContext();
export const UsersDataProvider = ({ children }) => {
    const [usersData, setUsersData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                const data = response.data.data;
                setUsersData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <UsersDataContext.Provider value={usersData}>
            {children}
        </UsersDataContext.Provider>

    );
};
