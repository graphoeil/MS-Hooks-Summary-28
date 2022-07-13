// Imports
import React from "react";
import styled from "styled-components";

// Component
const IngredientList = React.memo(({ ingredients, removeItem }) => {

	// DEV
	console.log('RENDERING INGREDIENT LIST');

    // Return
    return(
        <Wrapper>
			<h2>My ingredients</h2>
			<ul>
				{
					ingredients.map((ig) => {
						const { id, title, amount } = ig;
						return(
							<li key={ id } onClick={ () => { removeItem(id); } }>
								<span>{ title }</span>
								<span>{ amount }x</span>
							</li>
						);
					})
				}
			</ul>
        </Wrapper>
    );

});

// Styled
const Wrapper = styled.section`
	width: 30rem;
	max-width: 80%;
	margin: auto;
	h2{
		border-bottom: 3px solid #ccc;
		padding-bottom: 1rem;
	}
	ul{
		list-style: none;
		margin: 0;
		padding: 0;
		li{
			margin: 1rem 0;
			padding: 0.5rem 1rem;
			box-shadow: 0 1px 4px rgba(0, 0, 0, 0.26);
			display: flex;
			justify-content: space-between;
			cursor: pointer;
		}
	}
`;

// Export
export default IngredientList;