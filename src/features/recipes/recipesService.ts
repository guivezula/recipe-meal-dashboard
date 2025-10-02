import type { Recipe } from "../../types/recipe";

const fetchRecipes = async (filter?: string): Promise<Recipe[]>  => {
    return fetch("./recipes.json")
        .then((res) => res.json())
        .then((data) => {
            let filtered: Recipe[] = data;

            if (filter && filter.trim() !== "") {
                const lowerFilter = filter.toLowerCase();
                filtered = filtered.filter((recipe) => {
                    return recipe.cuisine.toLowerCase().includes(lowerFilter) ||
                    recipe.dietaryTags.includes(lowerFilter) ||
                    recipe.cookingTime.toString().includes(lowerFilter) ||
                    recipe.ingredients.map(i => i.name).includes(lowerFilter);
                })
            }

            return filtered
        })
        .catch((error) => error);
}

export const RecipesService = {
    fetchRecipes
}