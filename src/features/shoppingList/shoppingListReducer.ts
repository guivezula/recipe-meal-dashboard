import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MealPlan } from "../../types/mealPlan";
import type { IngredientCategory } from "../../types/recipe";
import type { ShoppingItem, ShoppingList } from "../../types/shoppingList";
import Helper from "./shoppingListHelper";

interface ShoppingState {
  items: ShoppingList;
  totalCost: number;
}

const initialState: ShoppingState = {
  items: {},
  totalCost: 0,
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    generateShoppingListByMeals: (state, action: PayloadAction<MealPlan[]>) => {
      const newList = new Map<IngredientCategory, ShoppingItem[]>();

      for (const meal of action.payload) {
        for (const ingredient of meal.recipe.ingredients) {
          Helper.addOrMergeItem(newList, { ...ingredient });
        }
      }

      state.items = Helper.mapToShoppingList(newList);
      state.totalCost = Helper.calculateTotalCost(newList);
    },

    addShoppingItem: (state, action: PayloadAction<ShoppingItem>) => {
      const map = Helper.shoppingListToMap(state.items);
      const newList = new Map(map);
      Helper.addOrMergeItem(newList, action.payload);

      state.items = Helper.mapToShoppingList(newList);
      state.totalCost = Helper.calculateTotalCost(newList);
    },

    updateShoppingItem: (
      state,
      action: PayloadAction<{
        category: IngredientCategory;
        id: string;
        updates: Partial<ShoppingItem>;
      }>
    ) => {
      const items = Helper.shoppingListToMap(state.items);
      const { category, id, updates } = action.payload;
      const categoryItems = items.get(category);
      if (!categoryItems) return;

      const itemIndex = categoryItems.findIndex((i) => i.id === id);
      if (itemIndex !== -1) {
        categoryItems[itemIndex] = {
          ...categoryItems[itemIndex],
          ...updates,
        };

        items.set(category, categoryItems);
        state.items = Helper.mapToShoppingList(items);
        state.totalCost = Helper.calculateTotalCost(items);
      }
    },

    removeShoppingItem: (
      state,
      action: PayloadAction<{ category: IngredientCategory; id: string }>
    ) => {
      const items = Helper.shoppingListToMap(state.items);
      const { category, id } = action.payload;
      const categoryItems = items.get(category);
      if (!categoryItems) return;

      const filtered = categoryItems.filter((i) => i.id !== id);
      items.set(category, filtered);

      state.items = Helper.mapToShoppingList(items);
      state.totalCost = Helper.calculateTotalCost(items);
    },
  },
});

export const {
  generateShoppingListByMeals,
  addShoppingItem,
  updateShoppingItem,
  removeShoppingItem,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
