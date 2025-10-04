import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MealPlan } from "../../types/mealPlan";
import type { ShoppingItem } from "../../types/shoppingList";
import Helper from "./shoppingListHelper";

interface ShoppingState {
  items: Map<string, ShoppingItem[]>;
  totalCost: number;
}

const initialState: ShoppingState = {
  items: new Map(),
  totalCost: 0,
};



const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    generateShoppingListByMeals: (state, action: PayloadAction<MealPlan[]>) => {
      const newList = new Map<string, ShoppingItem[]>();

      for (const meal of action.payload) {
        for (const ingredient of meal.recipe.ingredients) {
          Helper.addOrMergeItem(newList, { ...ingredient });
        }
      }

      state.items = newList;
      state.totalCost = Helper.calculateTotalCost(newList);
    },

    addShoppingItem: (state, action: PayloadAction<ShoppingItem>) => {
      const newList = new Map(state.items);
      Helper.addOrMergeItem(newList, action.payload);
      state.items = newList;
      state.totalCost = Helper.calculateTotalCost(newList);
    },

    updateShoppingItem: (
      state,
      action: PayloadAction<{
        category: string;
        id: string;
        updates: Partial<ShoppingItem>;
      }>
    ) => {
      const { category, id, updates } = action.payload;
      const categoryItems = state.items.get(category);
      if (!categoryItems) return;

      const itemIndex = categoryItems.findIndex((i) => i.id === id);
      if (itemIndex !== -1) {
        categoryItems[itemIndex] = {
          ...categoryItems[itemIndex],
          ...updates,
        };
        state.items.set(category, categoryItems);
        state.totalCost = Helper.calculateTotalCost(state.items);
      }
    },

    removeShoppingItem: (
      state,
      action: PayloadAction<{ category: string; id: string }>
    ) => {
      const { category, id } = action.payload;
      const categoryItems = state.items.get(category);
      if (!categoryItems) return;

      const filtered = categoryItems.filter((i) => i.id !== id);
      state.items.set(category, filtered);
      state.totalCost = Helper.calculateTotalCost(state.items);
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
