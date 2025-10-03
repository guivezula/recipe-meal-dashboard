import { combineReducers } from "@reduxjs/toolkit";
import { mealPlanReducer } from "../features/mealPlan/mealPlanReducer";
import { recipesReducer } from "../features/recipes/recipesReducer";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  mealPlan: mealPlanReducer,
});

export default rootReducer;