import type { NutritionInfo } from "../../types/recipe";

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

export default {
    sumNutrition,
    subtractNutrition,
}