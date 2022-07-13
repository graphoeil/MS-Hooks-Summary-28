// Imports
import React, { useEffect, useState } from "react";
import styled from "styled-components";

/* We must modify firebase rules like this for searching !!!
{
  "rules": {
    ".read": true,
    ".write": true,
      // For searching function
      "ingredients":{
        ".indexOn":["title"]
      }
  }
}
And think to publish changes at the end ,-) */

// Component
const Search = React.memo(({ searchIngredients }) => {

	// Firebase URL
	const firebaseURL = 'https://ms-hooks-28-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json';

	// Search input
	const [search, setSearch] = useState('');

	// Send request, and load data on first mount in Ingredients
	useEffect(() => {
		// Query
		const query = search.length === 0 ? '' : `?orderBy="title"&equalTo="${ search }"`;
		// Debouncing with timer
		const searchTimer = setTimeout(async() => {
			// Send request to Firebase
			const response = await fetch(firebaseURL + query);
			const data = await response.json();
			// Firebase return a collection of objects
			const ingredients = [];
			for (const key in data){
				ingredients.push({
					id:key,
					title:data[key].title,
					amount:data[key].amount
				});
			}
			// We must useCallback in the parent (here Ingredients)
			// to avoid re-creating function on each timeout !!!
			searchIngredients(ingredients);
		},250);
		// Clean function is run at every changes
		// and then cancel the last timer ,-)
		return () => {
			clearTimeout(searchTimer);
		}
	},[search, searchIngredients]);

    // Return
    return(
        <Wrapper className="card">
			<div className="search-input">
				<label>Filter by Title</label>
				<input type="text" value={ search } onChange={ (e) => { setSearch(e.target.value); } } />
			</div>
        </Wrapper>
    );

});

// Styled
const Wrapper = styled.section`
	width: 30rem;
	margin: 2rem auto;
	max-width: 80%;
	.search-input{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		input{
			font: inherit;
			border: 1px solid #ccc;
			border-radius: 5px;
			padding: 0.15rem 0.25rem;
			&:focus{
				outline: none;
				border-color: #ff2058;
			}
		}
	}
	@media only screen and (min-width:768px){
		.search-input{
			flex-direction: row;
		}
	}
`;

// Export
export default Search;