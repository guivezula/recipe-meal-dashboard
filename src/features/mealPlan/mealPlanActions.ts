import { createAction } from "@reduxjs/toolkit";
import type { MealPlan } from "../../types/mealPlan";


export const addMealPlan = createAction<MealPlan>(
    'mealPlan/addMealPlan',
)

export const removeMealPlan = createAction<string>(
    'mealPlan/removeMealPlan',
)

export const removeAllMealPlan = createAction(
    'mealPlan/removeAllMealPlan',
)