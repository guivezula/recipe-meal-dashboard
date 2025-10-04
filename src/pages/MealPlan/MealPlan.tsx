import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Button from "../../components/Button/Button";
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid";
import Header from "../../components/Header/Header";
import { removeAllMealPlan } from "../../features/mealPlan/mealPlanReducer";
import "./MealPlan.scss";

const CLASS_NAME = "meal-plan";

function MealPlan() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClearCalendar = () => {
    dispatch(removeAllMealPlan());
  };

  const handleBackNavigation = () => {
    navigate("/recipes");
  };

  return (
    <div className={CLASS_NAME}>
      <Header backButton onBackClick={handleBackNavigation}>
        Weekly Meal Planner
      </Header>
      <div className={`${CLASS_NAME}__actions`}>
        <Button onClick={handleClearCalendar}>Clear Calendar</Button>
        <Button>Generate Shopping List</Button>
      </div>
      <CalendarGrid />
    </div>
  );
}

export default MealPlan;
