import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { Recipe } from "../../types/recipe";
import { RecipesService } from "./recipesService";


export const getRecipes = createAsyncThunk<Recipe[], string>(
    'recipes/getRecipes',
    (filter?: string) => RecipesService.fetchRecipes(filter),
)

export const setSelectedRecipe = createAction<Recipe | null>(
    'recipes/setSelectedRecipe',
)