import type { ShoppingItem } from "../../types/shoppingList";

function calculateTotalCost(items: Map<string, ShoppingItem[]>): number {
  let total = 0;
  items.forEach((list) => {
    list.forEach((item) => {
      if (!item.haveAlready && item.price) {
        total += item.price * item.quantity;
      }
    });
  });
  return parseFloat(total.toFixed(2));
}

function addOrMergeItem(
  list: Map<string, ShoppingItem[]>,
  item: ShoppingItem
): Map<string, ShoppingItem[]> {
  const categoryItems = list.get(item.category) || [];

  const existing = categoryItems.find(
    (i) =>
      i.id === item.id ||
      i.name.toLowerCase() === item.name.toLowerCase()
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    categoryItems.push(item);
  }

  list.set(item.category, categoryItems);
  return list;
}

export default {
    calculateTotalCost,
    addOrMergeItem,
}