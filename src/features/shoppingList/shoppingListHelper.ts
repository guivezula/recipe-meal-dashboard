import type { IngredientCategory } from "../../types/recipe";
import type { ShoppingItem, ShoppingList } from "../../types/shoppingList";

function calculateTotalCost(
  items: Map<IngredientCategory, ShoppingItem[]>
): number {
  let total = 0;
  items.forEach((list) => {
    list.forEach((item) => {
      if (!item.haveAlready && item.price) {
        total += item.price;
      }
    });
  });
  return parseFloat(total.toFixed(2));
}

function addOrMergeItem(
  list: Map<IngredientCategory, ShoppingItem[]>,
  item: ShoppingItem
): Map<IngredientCategory, ShoppingItem[]> {
  const categoryItems = list.get(item.category) || [];

  const existing = categoryItems.find(
    (i) => i.id === item.id || i.name.toLowerCase() === item.name.toLowerCase()
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    categoryItems.push(item);
  }

  list.set(item.category, categoryItems);
  return list;
}

function mapToShoppingList(
  map: Map<IngredientCategory, ShoppingItem[]>
): ShoppingList {
  const obj: ShoppingList = {} as ShoppingList;

  map.forEach((items, category) => {
    obj[category] = items;
  });

  return obj;
}

function shoppingListToMap(
  list: ShoppingList
): Map<IngredientCategory, ShoppingItem[]> {
  const map = new Map<IngredientCategory, ShoppingItem[]>();

  (Object.keys(list) as IngredientCategory[]).forEach((category) => {
    map.set(category, list[category] ?? []);
  });

  return map;
}

export default {
  calculateTotalCost,
  addOrMergeItem,
  mapToShoppingList,
  shoppingListToMap,
};
