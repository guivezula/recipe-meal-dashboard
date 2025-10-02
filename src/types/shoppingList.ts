import type { Ingredient } from "./recipe";

export interface ShoppingItem {
  id: string;
  ingredient: Ingredient;
  price?: number;
  haveAlready?: boolean;
}

export interface ShoppingList {
  id: string;
  items: ShoppingItem[];
  totalCost?: number;
}
