// Imports
import React, { useRef, useState } from "react";
import styled from "styled-components";
import LoadingIndicator from "../ui/LoadingIndicator";

// Component
const IngredientForm = React.memo(({ addIngredients, isLoading }) => {

	// DEV
	console.log('RENDERING INGREDIENT FORM');

	// Form data
	const [formData, setFormData] = useState({
		title:'',
		// amount like this, because input are always string !!
		amount:''
	});

	// Inputs change
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData((oldState) => {
			return { ...oldState, [name]:value };
		});
	};

	// Submit form
	const titleRef = useRef();
	const submitForm = (e) => {
		e.preventDefault();
		if (!formData.title.trim() || !formData.amount){
			return;
		}
		addIngredients({
			title:formData.title,
			amount:formData.amount
		});
		setFormData({ title:'', amount:'' });
		titleRef.current.focus();
	};

    // Return
    return(
        <Wrapper className="card">
			<form onSubmit={ submitForm }>
				<div className="form-control">
					<label htmlFor="title">Name</label>
					<input type="text" id="title" name="title" ref={ titleRef }
						value={ formData.title } onChange={ handleChange } />
				</div>
				<div className="form-control">
					<label htmlFor="amount">Amount</label>
					<input type="number" id="amount" name="amount" 
						value={ formData.amount } onChange={ handleChange } />
				</div>
				<div className="ingredient-form__actions">
					<button type="submit">Add Ingredient</button>
					{
						isLoading && <LoadingIndicator/>
					}
				</div>
			</form>
        </Wrapper>
    );

});

// Styled
const Wrapper = styled.section`
	width: 30rem;
	margin: 2rem auto;
	max-width: 80%;
	.form-control{
		label, input{
			display: block;
			width: 100%;
		}
		input{
			font: inherit;
			padding: 0.1rem 0.25rem;
			border: none;
			border-bottom: 2px solid #ccc;
			margin-bottom: 1rem;
			&:focus{
				outline: none;
				border-bottom-color: #ff2058;	
			}
		}
	}
	.ingredient-form__actions{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

// Export
export default IngredientForm;