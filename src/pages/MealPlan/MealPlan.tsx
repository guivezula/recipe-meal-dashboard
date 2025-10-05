import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Button from "../../components/Button/Button";
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid";
import Header from "../../components/Header/Header";
import { removeAllMealPlan } from "../../features/mealPlan/mealPlanReducer";
import { selectAllMeals } from "../../features/mealPlan/mealPlanSelectors";
import { generateShoppingListByMeals } from "../../features/shoppingList/shoppingListReducer";
import "./MealPlan.scss";

const CLASS_NAME = "meal-plan";

function MealPlan() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const meals = useSelector(selectAllMeals);

  const handleClearCalendar = () => {
    dispatch(removeAllMealPlan());
  };

  const handleBackNavigation = () => {
    navigate("/recipes");
  };

  const handleGenerateShopping = () => {
    dispatch(generateShoppingListByMeals(meals));
    navigate("/shopping-list");
  };

  return (
    <div className={CLASS_NAME}>
      <Header backButton onBackClick={handleBackNavigation}>
        Weekly Meal Planner
      </Header>
      <div className={`${CLASS_NAME}__actions`}>
        <Button onClick={handleClearCalendar}>Clear Calendar</Button>
        <Button disabled={meals.length <= 0} onClick={handleGenerateShopping}>
          Generate Shopping List
        </Button>
      </div>
      <CalendarGrid />
    </div>
  );
}

export default MealPlan;
