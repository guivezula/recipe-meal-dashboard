import React from "react";
import type { Recipe } from "../../types/recipe";
import "./RecipeDetails.scss";

type RecipeDetailsProps = React.HTMLAttributes<HTMLDivElement> & {
  recipe: Recipe;
}

const CLASS_NAME = "recipe-details";

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  return (
    <div className={CLASS_NAME}>
      <h2 className={`${CLASS_NAME}__title`}>{recipe.title}</h2>

      <div className={`${CLASS_NAME}__meta`}>
        <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
        <p><strong>Cooking time:</strong> {recipe.cookingTime} min</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
      </div>

      <div className={`${CLASS_NAME}__section`}>
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>
              {ing.quantity} {ing.unit} {ing.name}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${CLASS_NAME}__section`}>
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.map((step) => (
            <li key={step.order}>{step.description} <strong>Duration: </strong>{step.duration} min.</li>
          ))}
        </ol>
      </div>

      <div className={`${CLASS_NAME}__section`}>
        <h3>Nutrition</h3>
        <p><strong>Calories:</strong> {recipe.nutrition.calories ?? 0} kcal</p>
        <p><strong>Protein:</strong> {recipe.nutrition.protein} g</p>
        <p><strong>Carbs:</strong> {recipe.nutrition.carbs} g</p>
        <p><strong>Fat:</strong> {recipe.nutrition.fat} g</p>
      </div>

      {recipe.notes && recipe.notes.length > 0 && (
        <div className={`${CLASS_NAME}__section`}>
          <h3>Notes</h3>
          <ul>
            {recipe.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.sourceUrl && (
        <div className={`${CLASS_NAME}__section`}>
          <h3>Source</h3>
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${CLASS_NAME}__link`}
          >
            {recipe?.sourceUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
