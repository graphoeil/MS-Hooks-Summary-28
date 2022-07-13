// Imports
import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../ui/ErrorModal";

// Initial state
const initialState = {
	ingredients:[],
	isLoading:false,
	error:null
};

// Reducer function
const reducer = (state, action) => {
	//////////////////////////////////// Ingredients
	// Set ingredients
	if (action.type === 'SET_INGREDIENTS'){
		return { ...state, ingredients:action.payload };
	}
	// Add ingredient
	if (action.type === 'ADD_INGREDIENT'){
		return { ...state, ingredients:[ ...state.ingredients, action.payload ] };
	}
	// Remove ingredient
	if (action.type === 'REMOVE_INGREDIENT'){
		return { ...state, ingredients:state.ingredients.filter((ingredient) => {
			return ingredient.id !== action.payload;
		}) };
	}
	//////////////////////////////////// Loading
	// Toggle loading
	if (action.type === 'TOGGLE_LOADING'){
		return { ...state, isLoading:!state.isLoading };
	}
	//////////////////////////////////// Error
	// Set error
	if (action.type === 'SET_ERROR'){
		return { ...state, error:action.payload };
	}
	// Default
	throw new Error(`No action type match : ${ action.type }`);
};

// Component
const Ingredients = () => {

	// Firebase URL
	const firebaseURL = 'https://ms-hooks-28-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json';

	// Reducer to replace multiples states
	// We also could use a state with an object like in IngredientForm
	const [state, dispatch] = useReducer(reducer, initialState);

	// Load data on mount
	// With Search component that also fetch a request,
	// We dont need to fetch here ,-)

	// DEV
	useEffect(() => {
		console.log('RENDERING INGREDIENTS', state.ingredients);
	},[state.ingredients]);

	// Add new ingredients
	// We add useCallback for prevent too much function re-creation
	// when other components renders like (Search, LoadingIndicator ...)
	// For that we must add React.memo to IngredientForm.js
	const addIngredients = useCallback(async(ingredient) => {
		dispatch({ type:'TOGGLE_LOADING' });
		// Send to firebase
		const response = await fetch(firebaseURL, {
			method:'POST',
			body:JSON.stringify(ingredient),
			headers:{
				'Content-Type':'application/json'
			}
		});
		// Get data back
		const data = await response.json();
		dispatch({ type:'TOGGLE_LOADING' });
		// Update the state
		dispatch({ type:'ADD_INGREDIENT', payload:{ id:data.name, ...ingredient } });
	},[]);

	// Remove an ingredient
	const removeItem = useCallback(async(id) => {
		dispatch({ type:'TOGGLE_LOADING' });
		try {
			// Delete in firebase
			// We must pass the id in the url like this
			await fetch(`https://ms-hooks-28-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ id }.json`, {
				method:'DELETE'
			});
			dispatch({ type:'TOGGLE_LOADING' });
			// Update the state
			dispatch({ type:'REMOVE_INGREDIENT', payload:id });
		} catch (error){
			dispatch({ type:'SET_ERROR', payload:error.message });
		}
	},[]);

	// Search
	// useCallback prevent infinite loop by avoid re-creating 
	// this function on each render, it'll cache the function
	const searchIngredients = useCallback((ingredients) => {
		dispatch({ type:'SET_INGREDIENTS', payload:ingredients });
	},[]);

	// Clear error and close modal
	const clearError = () => {
		dispatch({ type:'SET_ERROR', payload:null });
		dispatch({ type:'TOGGLE_LOADING' });
	};

	// useMemo to cache component, and re-render only when props change
	// Will re-render when state.ingredients change !!!
	const ingredientList = useMemo(() => {
		return <IngredientList ingredients={ state.ingredients } removeItem={ removeItem }/>
	},[state.ingredients, removeItem]);

    // Return
    return(
        <React.Fragment>
			{
				state.error && <ErrorModal close={ clearError }>{ state.error }</ErrorModal>
			}
			<IngredientForm addIngredients={ addIngredients } isLoading={ state.isLoading }/>
			<section>
				<Search searchIngredients={ searchIngredients }/>
				{
					ingredientList
				}
			</section>
        </React.Fragment>
    );

};

// Export
export default Ingredients;