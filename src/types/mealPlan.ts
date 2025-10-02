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

export interface MealSlot {
  type: MealType;
  recipe: Recipe;
}

export interface DayPlan {
  date: string;
  weekday?: Weekday;
  meals: MealSlot[];
  nutritionSummary?: NutritionInfo;
}

export interface MealPlan {
  id: string;
  days: DayPlan[];
}
