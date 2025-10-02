import type { IngredientCategory } from "./recipe";


export interface ShoppingItem {
  id: string;
  ingredientName: string;
  quantity: number;
  unit: string;
  category: IngredientCategory;
  haveAlready: boolean;
}

export interface ShoppingList {
  id: string;
  weekPlanId: string; 
  items: ShoppingItem[];
}
