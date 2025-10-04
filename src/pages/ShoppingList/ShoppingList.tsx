import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Header from "../../components/Header/Header";
import IngredientForm from "../../components/IngredientForm/IngredientForm";
import {
  addShoppingItem,
  removeShoppingItem,
  updateShoppingItem,
} from "../../features/shoppingList/shoppingListReducer";
import { selectShoppingList, selectTotalCost } from "../../features/shoppingList/shoppingListSelectors";
import type { IngredientCategory } from "../../types/recipe";
import type { ShoppingItem } from "../../types/shoppingList";
import "./ShoppingList.scss";

const CLASS_NAME = "shopping-list";

function ShoppingListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const list = useSelector(selectShoppingList);
  const [payload, setPayload] = useState<{
    [I in IngredientCategory]?: ShoppingItem;
  }>({});
  const totalCost = useSelector(selectTotalCost);

  const handleBackNavigation = () => {
    navigate("/meal-plan");
  };

  const handleFormUpdate = (
    category: IngredientCategory,
    id: string,
    updates: Partial<ShoppingItem>
  ) => {
    dispatch(updateShoppingItem({ category, id, updates }));
  };

  const handleFormAttributesUpdate = (
    category: IngredientCategory,
    id: string,
    updates: Partial<ShoppingItem>
  ) => {
    setPayload({
      ...payload,
      [category]: {
        ...payload[category],
        id,
        ...updates,
      },
    });
  };

  const handleFormDelete = (category: IngredientCategory, id: string) => {
    dispatch(removeShoppingItem({ id, category }));
  };

  const handleFormAdd = (category: IngredientCategory, id: string) => {
    setPayload({
      ...payload,
      [category]: {
        id,
        category,
      },
    });
  };

  const handleFormSave = (ingredient: ShoppingItem) => {
    dispatch(addShoppingItem(ingredient));
    setPayload({
      ...payload,
      [ingredient.category]: {},
    });
  };

  const handleFormCancel = (category: IngredientCategory) => {
    setPayload({
      ...payload,
      [category]: {},
    });
  };

  return (
    <div className={CLASS_NAME}>
      <Header backButton onBackClick={handleBackNavigation}>
        Shopping List
      </Header>
      <div className={`${CLASS_NAME}__total-cost`}>
        <p className={`${CLASS_NAME}__total-cost__item`}>
          {`Total Cost: ${totalCost}`}
        </p>
      </div>
      <div className={`${CLASS_NAME}__list`}>
        {Object.keys(list).map((key) => {
          const category = key as IngredientCategory;
          return (
            <div key={category} className={`${CLASS_NAME}__list__category`}>
              <h2 className={`${CLASS_NAME}__list__category__heading`}>
                {category.toUpperCase()}
              </h2>
              {list[category]?.map((ingredient) => (
                <IngredientForm
                  key={ingredient.id}
                  ingredient={ingredient}
                  state="update"
                  onUpdate={handleFormUpdate}
                  onDelete={handleFormDelete}
                />
              ))}
              {payload[category]?.id && (
                <IngredientForm
                  state="save"
                  ingredient={payload[category]}
                  onUpdate={handleFormAttributesUpdate}
                  onSave={handleFormSave}
                  onCancel={() => handleFormCancel(category)}
                />
              )}
              <IngredientForm
                state="add"
                onAdd={(id) => handleFormAdd(category, id)}
              />
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

export default ShoppingListPage;
