import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import { useAuth } from "../context/AuthContext";
import { getRecipes } from "../services/RecipeAPI";

export default function RecipesScreen({ navigation, route }) {
  const { token } = useAuth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getRecipes(
        token,
        route.params.ingridient.strIngredient
      );
      setRecipes(response.meals);
    };
    fetch();
  }, []);

  return <RecipeList recipes={recipes} navigation={ navigation} />;
}
