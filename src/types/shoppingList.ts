import type { Ingredient, IngredientCategory } from "./recipe";

export interface ShoppingItem extends Ingredient {
  price?: number;
  haveAlready?: boolean;
}

export type ShoppingList = {
  [I in IngredientCategory]?: ShoppingItem[];
};
