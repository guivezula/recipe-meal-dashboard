import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import RecipeList from "./pages/RecipeList/RecipeList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" />} />

        <Route path="/recipes" element={<RecipeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
