import type React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  addMealPlan,
  removeMealPlan,
} from "../../features/mealPlan/mealPlanReducer";
import { selectAllMeals, selectSummaryNutrition } from "../../features/mealPlan/mealPlanSelectors";
import { selectAllRecipes } from "../../features/recipes/recipesSelectors";
import { type MealPlan, type MealType, type Weekday } from "../../types/mealPlan";
import type { Recipe } from "../../types/recipe";
import Button from "../Button/Button";
import MealCard from "../MealCard/MealCard";
import Modal from "../Modal/Modal";
import "./CalendarGrid.scss";

type CalendarGridProps = React.HTMLAttributes<HTMLDivElement> & {};

export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const mealTypes = ["Breakfast", "Lunch", "Dinner"] as const;

const CLASS_NAME = "calendar-grid";

const CalendarGrid: React.FC<CalendarGridProps> = ({ ...props }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [payload, setPayload] = useState<Partial<MealPlan>>();
  const recipes = useSelector(selectAllRecipes);
  const meals = useSelector(selectAllMeals);
  const summary = useSelector(selectSummaryNutrition);
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    setPayload({});
    
    setModalOpen(false);
  };

  const handleModalOpen = (weekday: Weekday, type: MealType) => {
    setModalOpen(true);

    setPayload({
      ...payload,
      id: `${type}-${weekday}`,
      type,
      weekday,
    });
  }

  const handleSelectChange = (recipe: Recipe) => {
    setPayload({
      ...payload,
      recipe,
    })
  }

  const handleRecipeSave = () => {
    if (payload) {
      const meal: MealPlan = {
        id: payload.id!,
        recipe: payload.recipe!,
        type: payload.type!,
        weekday: payload.weekday!,
      };
      
      dispatch(addMealPlan(meal));
      setModalOpen(false);
    }
  }

  const handleRecipeDelete = (id: string) => {
    dispatch(removeMealPlan(id));
  }

  const getMealPlan = (weekday: Weekday, type: MealType): MealPlan | undefined => {
    return meals.find(meal => meal.weekday === weekday && meal.type === type);
  }

  return (
    <div className={CLASS_NAME} {...props}>
      {weekdays.map((day) => (
        <div key={day} className={`${CLASS_NAME}__column`}>
          <h2 className={`${CLASS_NAME}__weekday`}>{day}</h2>
          {mealTypes.map((type) => (
            <MealCard
              key={type}
              mealType={type}
              mealPlan={getMealPlan(day, type)}
              onAddClick={() => handleModalOpen(day, type)}
              onRemoveClick={() => handleRecipeDelete(getMealPlan(day, type)?.id!)}
            />
          ))}
          <div className={`${CLASS_NAME}__summary`}>
            <p className={`${CLASS_NAME}__summary__item`}>
              {`Protein: ${summary[day]?.protein || 0} g`}
            </p>
            <p className={`${CLASS_NAME}__summary__item`}>
              {`Carbs: ${summary[day]?.carbs || 0} g`}
            </p>
            <p className={`${CLASS_NAME}__summary__item`}>
              {`Fat: ${summary[day]?.fat || 0} g`}
            </p>
            <p className={`${CLASS_NAME}__summary__item`}>
              {`Total: ${summary[day]?.calories || 0} kcal`}
            </p>
          </div>
        </div>
      ))}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div className={`${CLASS_NAME}__modal`}>
          <select
            className={`${CLASS_NAME}__modal__recipes`}
            onChange={(e) => handleSelectChange(JSON.parse(e.target.value))}
          >
            {recipes.map((recipe) => (
              <option
                key={recipe.id}
                value={JSON.stringify(recipe)}
              >
                {recipe.title}
              </option>
            ))}
          </select>
          <div className={`${CLASS_NAME}__modal__texts`}>
            <p className={`${CLASS_NAME}__modal__texts__item`}>
              {`Weekday: ${payload?.weekday}`}
            </p>
            <p className={`${CLASS_NAME}__modal__texts__item`}>
              {`Meal: ${payload?.type}`}
            </p>
          </div>
          <div className={`${CLASS_NAME}__modal__actions`}>
            <Button onClick={handleRecipeSave}>Save</Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarGrid;
