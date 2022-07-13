// Imports
import React, { useContext, useState } from "react";

// Context
const AuthContext = React.createContext({
	// Context description for autoComplete
	isAuth:false,
	login:()=>{}
});

// Provider
const AuthProvider = ({ children }) => {

	// Variables
	const [isAuth, setIsAuth] = useState(false);

	// Methods
	const login = () => {
		setIsAuth(true);
	};

	// Return
	return <AuthContext.Provider value={ {
		isAuth, login
	} }>{ children }</AuthContext.Provider>

};

// Custom hook
export const useAuthContext = () => {
	return useContext(AuthContext);
};

// Provider export
export { AuthProvider };