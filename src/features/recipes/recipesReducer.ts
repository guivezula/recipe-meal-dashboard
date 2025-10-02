import { createReducer } from "@reduxjs/toolkit";
import type { Recipe } from "../../types/recipe";
import { getRecipes, setSelectedRecipe } from "./recipesActions";

interface RecipesState {
    list: Recipe[];
    selectedRecipe: Recipe | null;
    loading: boolean;
    error: any,
}

const initialState: RecipesState = {
    list: [],
    selectedRecipe: null,
    loading: false,
    error: null,
}

export const recipesReducer = createReducer(initialState, (builder) => {
    builder.addCase(getRecipes.pending, (state) => ({
        ...state,
        list: [],
        loading: true,
    }));

    builder.addCase(getRecipes.rejected, (state, action) => ({
        ...state,
        list: [],
        loading: false,
        error: action.payload,
    }));

    builder.addCase(getRecipes.fulfilled, (state, action) => ({
        ...state,
        list: action.payload,
        loading: false,
        error: null,
    }));

    builder.addCase(setSelectedRecipe, (state, action) => ({
        ...state,
        selectedRecipe: action.payload,
    }));
});