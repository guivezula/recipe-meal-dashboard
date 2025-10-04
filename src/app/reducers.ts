import { combineReducers } from "@reduxjs/toolkit";
import mealPlanReducer from "../features/mealPlan/mealPlanReducer";
import recipesReducer from "../features/recipes/recipesReducer";
import shoppingListReducer from "../features/shoppingList/shoppingListReducer";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  mealPlan: mealPlanReducer,
  shoppingList: shoppingListReducer,
});

export default rootReducer;