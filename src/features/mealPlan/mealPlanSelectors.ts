import type { RootState } from "../../app/store";

export const selectAllMeals = (state: RootState) => state.mealPlan.list;

export const selectSummaryNutrition = (state: RootState) => state.mealPlan.nutritionSummary;