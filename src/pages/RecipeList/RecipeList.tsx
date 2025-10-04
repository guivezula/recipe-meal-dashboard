import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Button from "../../components/Button/Button";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import {
  getRecipes,
  setSelectedRecipe,
} from "../../features/recipes/recipesActions";
import {
  selectAllRecipes,
  selectRecipe,
} from "../../features/recipes/recipesSelectors";
import type { Recipe } from "../../types/recipe";
import "./RecipeList.scss";

const CLASS_NAME = "recipe-list";

function RecipeList() {
  const dispatch = useAppDispatch();
  const recipes = useSelector(selectAllRecipes);
  const selectedRecipe = useSelector(selectRecipe);
  const [filter, setFilter] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRecipes(filter));
  }, [filter]);

  const handleFilter = (filter: unknown) => {
    setFilter(filter as string);
  };

  const handleMealPlanPage = () => {
    navigate("/meal-plan");
  };

  const handleModalClose = () => {
    dispatch(setSelectedRecipe(null));
  };

  const handleCardSelect = (recipe: Recipe) => {
    dispatch(setSelectedRecipe(recipe));
  };

  return (
    <div className={CLASS_NAME}>
      <Header>Recipes</Header>
      <Filter placeholder="Search here ..." onSearch={handleFilter}>
        <Button onClick={handleMealPlanPage}>Weekly Meal Planner</Button>
      </Filter>
      <div className={`${CLASS_NAME}__list`}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSelectRecipe={(recipe) => handleCardSelect(recipe)}
          />
        ))}
      </div>
      <Modal open={!!selectedRecipe} onClose={handleModalClose}>
        <RecipeDetails recipe={selectedRecipe!} />
      </Modal>
    </div>
  );
}

export default RecipeList;