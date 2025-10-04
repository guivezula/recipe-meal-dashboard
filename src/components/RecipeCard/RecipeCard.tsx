import type React from "react";
import type { Recipe } from "../../types/recipe";
import "./RecipeCard.scss";

type RecipeCardProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  recipe: Recipe;
  onSelectRecipe?: (recipe: Recipe) => void;
};

const CLASS_NAME = "recipe-card";

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelectRecipe,
  ...props
}) => {
  const { image, title, cookingTime, difficulty, dietaryTags } = recipe;

  const handleClick = (recipe: Recipe) => {
    !!onSelectRecipe && onSelectRecipe(recipe);
  };

  return (
    <button
      className={CLASS_NAME}
      {...props}
      onClick={() => handleClick(recipe)}
    >
      <img className={`${CLASS_NAME}__image`} src={image} />
      <h2 className={`${CLASS_NAME}__title`}>{title}</h2>
      <p
        className={`${CLASS_NAME}__text`}
      >{`Cooking time: ${cookingTime} min`}</p>
      <p className={`${CLASS_NAME}__text`}>{`Difficulty: ${difficulty}`}</p>
      <div className={`${CLASS_NAME}__tag`}>
        {dietaryTags.map((tag) => (
          <span className={`${CLASS_NAME}__tag__item`} key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
};

export default RecipeCard;