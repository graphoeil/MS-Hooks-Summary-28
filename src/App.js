// Imports
import React from "react";
import Ingredients from "./components/ingredients/Ingredients";
import Auth from "./components/Auth";
import { useAuthContext } from "./context/context";

// Component
const App = () => {

	// Context
	const { isAuth } = useAuthContext();

	// Return
	return(
		<React.Fragment>
			{
				isAuth ? <Ingredients/> : <Auth/>
			}
		</React.Fragment>
	);

};

// Export
export default App;