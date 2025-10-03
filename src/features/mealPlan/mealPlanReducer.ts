import { createReducer } from "@reduxjs/toolkit";
import type { MealPlan, MealPlanNutrition } from "../../types/mealPlan";
import type { NutritionInfo } from "../../types/recipe";
import { addMealPlan, removeAllMealPlan, removeMealPlan } from "./mealPlanActions";

interface MealPlanState {
  list: MealPlan[];
  nutritionSummary: MealPlanNutrition;
}

const initialState: MealPlanState = {
  list: [],
  nutritionSummary: {},
};

function sumNutrition(a: NutritionInfo, b: NutritionInfo): NutritionInfo {
  return {
    calories: (a.calories ?? 0) + (b.calories ?? 0),
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat,
  };
}

function subtractNutrition(a: NutritionInfo, b: NutritionInfo): NutritionInfo {
  return {
    calories: (a.calories ?? 0) - (b.calories ?? 0),
    protein: a.protein - b.protein,
    carbs: a.carbs - b.carbs,
    fat: a.fat - b.fat,
  };
}

export const mealPlanReducer = createReducer(initialState, (builder) => {
  builder.addCase(addMealPlan, (state, action) => {
    state.list.push(action.payload);

    const {
      weekday,
      recipe: { nutrition },
    } = action.payload;
    const existing = state.nutritionSummary[weekday];

    if (existing) {
      state.nutritionSummary[weekday] = sumNutrition(existing, nutrition);
    } else {
      state.nutritionSummary[weekday] = { ...nutrition };
    }
  });

  builder.addCase(removeMealPlan, (state, action) => {
    const mealId = action.payload;
    const mealIndex = state.list.findIndex((m) => m.id === mealId);

    if (mealIndex !== -1) {
      const meal = state.list[mealIndex];

      const recipeNutrition = meal.recipe.nutrition;
      const existing = state.nutritionSummary[meal.weekday];

      if (existing) {
        state.nutritionSummary[meal.weekday] = subtractNutrition(
          existing,
          recipeNutrition
        );

        const { calories, protein, carbs, fat } =
          state.nutritionSummary[meal.weekday]!;

        if (
          calories &&
          calories <= 0 &&
          protein <= 0 &&
          carbs <= 0 &&
          fat <= 0
        ) {
          delete state.nutritionSummary[meal.weekday];
        }
      }

      state.list.splice(mealIndex, 1);
    }
  });

  builder.addCase(removeAllMealPlan, (state) => ({
    ...state,
    list: [],
    nutritionSummary: {},
  }));
});
