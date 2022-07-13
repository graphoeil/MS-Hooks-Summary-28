// Imports
import React from "react";
import styled from "styled-components";
import { useAuthContext } from "../context/context";

// Component
const Auth = () => {

	// Context
	const { login } = useAuthContext();

	// Return
	return(
		<Wrapper className="card">
			<h2>You are not authenticated!</h2>
			<p>Please log in to continue.</p>
			<button onClick={ login }>Log In</button>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.div`
	width: 30rem;
	margin: 2rem auto;
	max-width: 80%;
	text-align: center;
`;

// Export
export default Auth;