import type { NutritionInfo } from "../../types/recipe";

/**
 * Increase the nutrition info when a meal is added
 * @param {NutritionInfo} a:NutritionInfo
 * @param {NutritionInfo} b:NutritionInfo
 * @returns {NutritionInfo}
 */
function sumNutrition(a: NutritionInfo, b: NutritionInfo): NutritionInfo {
  return {
    calories: (a.calories ?? 0) + (b.calories ?? 0),
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat,
  };
}

/**
 * Decrease the nutrition info when a meal is removed
 * @param {NutritionInfo} a:NutritionInfo
 * @param {NutritionInfo} b:NutritionInfo
 * @returns {NutritionInfo}
 */
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