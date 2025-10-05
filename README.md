# Meal Planner App

A smart meal planning application that lets users create weekly meal plans, automatically generate shopping lists, calculate estimated costs, and view recipe nutrition summaries.

## Setup Instructions

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
git clone https://github.com/guivezula/recipe-meal-planner.git
cd recipe-meal-planner
npm install
npm run dev
```
The app will be available at http://localhost:5173

## AI Usage Documentation

During development, as I don't have Copilot plus and my cote was full, I used ChatGPT (GPT-5) as a technical assistant for:

- Initial code generation for components such as:

  - Base structure of Modal and RecipeDetails

  - Reducer skeletons (shoppingList, recipes, mealPlan)

  - Utility functions like calculateTotalCost, addOrMergeItem, etc.

  - Architecture refactoring, including migrating reducers to createSlice and reorganizing global state structure.

- All generated code was manually reviewed and adapted, with:

  - Type safety improvements (TypeScript)

  - Conversion of Map to serializable objects in Redux

  - Integration with the local RecipesService

  - Optimization of helper functions and cost calculations

The IA was used to generate the recipes.json file after many "tryings" the IA was able to
generate a reasonable amount of data to be tested.

## Architecture Decisions & Reasoning

### Key Choices

- React + Redux Toolkit: Provides a centralized and predictable state management solution, simplifying logic for meal planning and shopping list generation

- Separated reducers:
  - `recipes`: manages recipe list and selection;
  - `mealPlan`: handles weekly meal planning and nutrition summary;
  - `shoppingList`: handles the generated ingredients, integrates new ingredients with the generated, update and exclude them, and track costs;

- Implementation of a middleware: Provides the integration of the localStorage with the state management developed by using Redux.
- Local JSON data source: Recipes are loaded from `public/data/recipes.json` file to enable future changes, for example, integration with API.

## Challenges Faced and Solution

| Challenge                                                                       | Solution                                                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Redux warnings about non-serializable state** (using `Map` for shopping list) | Converted `Map` to plain object (`Record<string, ShoppingItem[]>`) before storing in Redux.                  |
| **Avoiding ingredient duplication when generating shopping list**               | Implemented `addOrMergeItem` to merge items by `id` or `name` and sum their quantities.                      |
| **Keeping total cost updated dynamically**                                      | Recalculated cost with `calculateTotalCost` after every modification (add, update, remove, or generate).     |                                                |
| **Flexible recipe filtering**                                                   | Added case-insensitive filtering by cuisine, dietary tag, cooking time, and ingredients in `RecipesService`. |
| **Add recipes into weekly meal planner**                                                   | For a quick solution, not the best one, it uses a select to list all the recipes in a modal. |

## Suggested Folder Structure

```
src/
├── app/
│   ├── hooks.ts
│   ├── middleware.ts
│   ├── reducers.ts
│   ├── store.ts
├── assets/
├── components/
├── features/
│   ├── mealPlan/
│   ├── recipes/
│   ├── shoppingList/
├── pages/
├── styles/
├── types/
│   ├── recipe.ts
│   ├── mealPlan.ts
│   └── shoppingList.ts
├── App.scss
├── App.tsx
├── index.scss
└── main.tsx
```

The decision was separate `components` to `pages` which makes the structure cleaner as many components were needed to
be created, for example, icon, button, modal, and etc. In the folder `app` all the settings from Redux and LocalStorage were
implemented. Thus, the `features` had the reducers, helpers and selectors related to the store.

## What I Would Do Differently With More Time

- Add unit tests for reducers, helper functions, service and components: there was no time to implement all the needed tests.

- Create or use a reusable UI component library: the implementation took longer because it was need to implement a lot of simple components.

- Integrate a real API for live recipe and price data: It would be nice to have an API to return those data, so it wouldn't be needed
to create a lot of functions to manipulate the data.

- Implement accessibility in the components according to WCAG: there was no time to thing about all the need accessibility including design solutions and rules

- Create best solutions to add a recipe into meal planner: As I mentioned before, to add recipes into meal planner I created a modal
with a select recovering all the recipes. If I had more time I would create a better solution with lazy loading, thinking about in 
the possibility to have a big amount of data.
