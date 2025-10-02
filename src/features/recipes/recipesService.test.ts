import { describe, expect, it, vi } from 'vitest';
import recipesData from "../../../public/data/recipes.json";
import type { Recipe } from '../../types/recipe';
import { RecipesService } from "./recipesService";

describe('Recipes Service', () => {
  it('should return the recipes list empty', async () => {
    vi.spyOn(RecipesService, 'fetchRecipes').mockResolvedValue([]);
    const response = await RecipesService.fetchRecipes();
    expect(response).toEqual([]);
  });

  it('should return the recipes list with data', async () => {
    vi
      .spyOn(RecipesService, 'fetchRecipes')
      .mockResolvedValue([recipesData[0] as Recipe, recipesData[1] as Recipe]);
    const response = await RecipesService.fetchRecipes();
    expect(response).toEqual([
      recipesData[0],
      recipesData[1],
    ]);
  });
});