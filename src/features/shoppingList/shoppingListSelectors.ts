import type { RootState } from "../../app/store";

export const selectShoppingList = (state: RootState) => state.shoppingList.items;

export const selectTotalCost = (state: RootState) => state.shoppingList.totalCost;