import type { NutritionInfo, Recipe } from "./recipe";

export type MealType = "Breakfast" | "Lunch" | "Dinner";

export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface MealPlan {
  id: string;
  weekday: Weekday;
  type: MealType;
  recipe: Recipe;
}

export type MealPlanNutrition = {
  [W in Weekday]?: NutritionInfo;
};
