import { combineReducers } from "@reduxjs/toolkit";
import { recipesReducer } from "../features/recipes/recipesReducer";

const rootReducer = combineReducers({
    recipes: recipesReducer,
});

export default rootReducer;