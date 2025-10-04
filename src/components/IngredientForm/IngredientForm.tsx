import classNames from "classnames";
import type React from "react";
import type { IngredientCategory } from "../../types/recipe";
import type { ShoppingItem } from "../../types/shoppingList";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import "./IngredientForm.scss";

type IngredientFormProps = React.HTMLAttributes<HTMLDivElement> & {
  ingredient?: ShoppingItem;
  state: "save" | "add" | "update";
  onSave?: (ingredient: ShoppingItem) => void;
  onUpdate?: (
    category: IngredientCategory,
    id: string,
    updates: Partial<ShoppingItem>
  ) => void;
  onDelete?: (category: IngredientCategory, id: string) => void;
  onCancel?: () => void;
  onAdd?: (id: string) => void;
};

const CLASS_NAME = "ingredient-form";

const IngredientForm: React.FC<IngredientFormProps> = ({
  ingredient,
  state,
  onSave,
  onUpdate,
  onDelete,
  onCancel,
  onAdd,
  ...props
}) => {
  const generateId = (): string => {
    const randomNumber = Math.floor(Math.random() * 10000) + 301;
    return `i${randomNumber}`;
  };

  const handleUpdate = (
    category: IngredientCategory,
    id: string,
    updates: Partial<ShoppingItem>
  ) => {
    !!onUpdate && onUpdate(category, id, updates);
  };

  const handleDelete = (category: IngredientCategory, id: string) => {
    !!onDelete && onDelete(category, id);
  };

  const handleAdd = () => {
    !!onAdd && onAdd(generateId());
  };

  const handleSave = (ingredient: ShoppingItem) => {
    !!onSave && onSave(ingredient);
  }

  return (
    <div className={CLASS_NAME} {...props}>
      {state !== "add" && (
        <div className={`${CLASS_NAME}__inputs`}>
          <input
            className={`${CLASS_NAME}__input`}
            name="ingredient-name"
            placeholder="Name"
            value={ingredient?.name}
            disabled={state === "update"}
            onChange={(e) =>
              handleUpdate(ingredient?.category!, ingredient?.id!, {
                name: e.target.value,
              })
            }
          />
          <input
            className={`${CLASS_NAME}__input`}
            name="quantity"
            placeholder="Quantity"
            value={ingredient?.quantity}
            disabled={state === "update"}
            onChange={(e) =>
              handleUpdate(ingredient?.category!, ingredient?.id!, {
                quantity: Number(e.target.value),
              })
            }
          />
          <input
            className={`${CLASS_NAME}__input`}
            name="unit"
            placeholder="Unit"
            value={ingredient?.unit}
            disabled={state === "update"}
            onChange={(e) =>
              handleUpdate(ingredient?.category!, ingredient?.id!, {
                unit: e.target.value,
              })
            }
          />
          <input
            className={`${CLASS_NAME}__input`}
            name="price"
            placeholder="Price"
            value={ingredient?.price}
            type="number"
            step="0.01"
            min="0"
            onChange={(e) =>
              handleUpdate(ingredient?.category!, ingredient?.id!, {
                price: Number(e.target.value),
              })
            }
          />
          {state === "update" && (
            <label className={`${CLASS_NAME}__label`} id={ingredient?.id}>
              <input
                className={`${CLASS_NAME}__input`}
                name="already-have"
                type="checkbox"
                checked={ingredient?.haveAlready}
                onChange={(e) =>
                  handleUpdate(ingredient?.category!, ingredient?.id!, {
                    haveAlready: e.target.checked,
                  })
                }
              />
              Have Already?
            </label>
          )}
        </div>
      )}
      <div
        className={classNames({
          [`${CLASS_NAME}__actions`]: true,
          [`${CLASS_NAME}__actions--add`]: state === "add",
          [`${CLASS_NAME}__actions--save`]: state === "save",
        })}
      >
        {state === "update" && (
          <ButtonIcon
            icon="delete"
            onClick={() => handleDelete(ingredient?.category!, ingredient?.id!)}
          />
        )}
        {state === "add" && (
          <ButtonIcon icon="add" border onClick={handleAdd} />
        )}
        {state === "save" && <ButtonIcon icon="save" onClick={() => handleSave(ingredient!)} />}
        {state === "save" && <ButtonIcon icon="close" onClick={onCancel} />}
      </div>
    </div>
  );
};

export default IngredientForm;
