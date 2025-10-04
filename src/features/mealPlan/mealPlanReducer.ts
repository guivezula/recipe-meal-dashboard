import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MealPlan, MealPlanNutrition } from "../../types/mealPlan";
import Helper from "./mealPlanHelper";

interface MealPlanState {
  list: MealPlan[];
  nutritionSummary: MealPlanNutrition;
}

const initialState: MealPlanState = {
  list: [],
  nutritionSummary: {},
};

/**
 * IA generated code, this method create the reducer slice to add the actions to manage the local storage
 * @param {any} {name:"mealPlan"
 * @param {any} initialState
 * @param {any} reducers:{addMealPlan:(state
 * @param {any} action:PayloadAction<MealPlan>
 * @returns {any}
 */
const mealPlanSlice = createSlice({
  name: "mealPlan",
  initialState,
  reducers: {
    addMealPlan: (state, action: PayloadAction<MealPlan>) => {
      const { weekday, recipe } = action.payload;

      state.list.push(action.payload);

      const existing = state.nutritionSummary[weekday];
      if (existing) {
        state.nutritionSummary[weekday] = Helper.sumNutrition(
          existing,
          recipe.nutrition
        );
      } else {
        state.nutritionSummary[weekday] = { ...recipe.nutrition };
      }
    },

    removeMealPlan: (state, action: PayloadAction<string>) => {
      const mealId = action.payload;
      const mealIndex = state.list.findIndex((m) => m.id === mealId);

      if (mealIndex === -1) return;

      const meal = state.list[mealIndex];
      const existing = state.nutritionSummary[meal.weekday];
      if (!existing) return;

      const updated = Helper.subtractNutrition(existing, meal.recipe.nutrition);

      const allZero =
        (updated.calories ?? 0) <= 0 &&
        updated.protein <= 0 &&
        updated.carbs <= 0 &&
        updated.fat <= 0;

      if (allZero) {
        delete state.nutritionSummary[meal.weekday];
      } else {
        state.nutritionSummary[meal.weekday] = updated;
      }

      state.list.splice(mealIndex, 1);
    },

    removeAllMealPlan: (state) => {
      state.list = [];
      state.nutritionSummary = {};
    },
  },
});

export const { addMealPlan, removeMealPlan, removeAllMealPlan } =
  mealPlanSlice.actions;
export default mealPlanSlice.reducer;
