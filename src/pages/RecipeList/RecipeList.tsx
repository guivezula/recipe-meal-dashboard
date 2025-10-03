import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import Button from "../../components/Button/Button";
import Filter from "../../components/Filter/Filter";
import Header from "../../components/Header/Header";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { getRecipes } from "../../features/recipes/recipesActions";
import { selectAllRecipes } from "../../features/recipes/recipesSelectors";
import "./RecipeList.scss";

const CLASS_NAME = "recipe-list";

function RecipeList() {
    const dispatch = useAppDispatch();
    const recipes = useSelector(selectAllRecipes);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        console.log(recipes);
        dispatch(getRecipes(filter));
    },[filter]);

    const handleFilter = (filter: unknown) => {
        setFilter(filter as string);
    }

    return <div className={CLASS_NAME}>
        <Header>
            Recipes
        </Header>
        <Filter placeholder="Search here ..." onSearch={handleFilter}>
            <Button>Meal Planner</Button>
        </Filter>
        <div className={`${CLASS_NAME}__list`}>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    </div>
}

export default RecipeList;