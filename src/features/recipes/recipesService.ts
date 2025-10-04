import type { Recipe } from "../../types/recipe";

/**
 * This service fetch the mock recipe date created in the JSON file
 * It receives a filter as params as it's not an API the filter is made by locally 
 * @param {any} filter?:String
 * @returns {any}
 */
const fetchRecipes = async (filter?: String): Promise<Recipe[]> => {
  return fetch("/data/recipes.json")
    .then((res) => res.json())
    .then((data) => {
      let filtered: Recipe[] = data;

      if (!!filter && filter.trim() !== "") {
        const lowerFilter = filter.toLowerCase();
        filtered = filtered.filter((recipe) => {
          return (
            recipe.cuisine.toLowerCase().includes(lowerFilter) ||
            recipe.dietaryTags.includes(lowerFilter) ||
            recipe.cookingTime.toString().includes(lowerFilter) ||
            recipe.ingredients.map((i) => i.name).includes(lowerFilter)
          );
        });
      }

      return filtered;
    })
    .catch((error) => error);
};

export default {
  fetchRecipes,
};