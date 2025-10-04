import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Recipe } from "../../types/recipe";
import RecipesService from "./recipesService";

export const getRecipes = createAsyncThunk<Recipe[], string | undefined>(
  "recipes/getRecipes",
  (filter?: string) => RecipesService.fetchRecipes(filter)
);

interface RecipesState {
  list: Recipe[];
  selectedRecipe: Recipe | null;
  loading: boolean;
  error: any;
}

const initialState: RecipesState = {
  list: [],
  selectedRecipe: null,
  loading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setSelectedRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
