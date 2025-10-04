import type React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAllRecipes } from "../../features/recipes/recipesSelectors";
import type { MealPlan, MealType } from "../../types/mealPlan";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import "./MalCard.scss";

type MealCardProps = React.HTMLAttributes<HTMLDivElement> & {
    mealPlan?: MealPlan;
    mealType: MealType;
    onAddClick?: () => void;
    onRemoveClick?: (id: string) => void;
};

const CLASS_NAME = "meal-card";

const MealCard: React.FC<MealCardProps> = ({ mealType, mealPlan, onAddClick, onRemoveClick, ...props}) => {
    const title = mealPlan ? mealPlan.recipe.title : mealType;
    const icon = mealPlan ? "delete" : "add";
    const recipes = useAppSelector(selectAllRecipes);

    const handleIconClick = () => {
        if (mealPlan) {
            !!onRemoveClick && onRemoveClick(mealPlan.id)
        } else {
            !!onAddClick && onAddClick();
        }
    }

    return (
        <div className={CLASS_NAME} {...props}>
            <h3 className={`${CLASS_NAME}__type`}>{title}</h3>
            <ButtonIcon icon={icon} border onClick={handleIconClick} />
        </div>
    )
}

export default MealCard;