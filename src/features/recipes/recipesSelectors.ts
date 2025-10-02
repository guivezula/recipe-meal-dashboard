import type { RootState } from "../../app/store";

export const selectAllRecipes = (state: RootState) => state.recipes.list;

export const selectRecipe = (state: RootState) => state.recipes.selectedRecipe;