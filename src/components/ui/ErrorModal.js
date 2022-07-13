// Imports
import React from "react";
import styled from "styled-components";

// Component
const ErrorModal = React.memo(({ close, children }) => {

    // Return
    return(
        <React.Fragment>
			
			{/* Backdrop */}
			<BackdropWrapper onClick={ close }/>
			{/* Backdrop */}

			{/* Modal */}
			<ModalWrapper>
			<h2>An Error Occurred!</h2>
			<p>{ children }</p>
			<div className="error-modal__actions">
				<button type="button" onClick={ close }>
					Okay
				</button>
			</div>
			</ModalWrapper>
			{/* Modal */}

        </React.Fragment>
    );

});

// Styled
const BackdropWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.75);
	z-index: 50;
`;
const ModalWrapper = styled.div`
	position: fixed;
	top: 30vh;
	left: calc(50% - 15rem);
	width: 30rem;
	background: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	z-index: 100;
	border-radius: 7px;
	h2{
		margin: 0;
		padding: 1rem;
		background: #ff2058;
		color: white;
		border-radius: 7px 7px 0 0;
	}
	p{ padding: 1rem; }
	.error-modal__actions{
		display: flex;
		justify-content: flex-end;
		padding: 0 0.5rem;
	}
`;

// Export
export default ErrorModal;