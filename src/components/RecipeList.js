import React from "react";
import { FlatList } from "react-native";
import RecipeItem from "../components/RecipeItem";

export default function RecipeList({ recipes, navigation }) {
  return (
    <FlatList
      data={recipes}
      keyExtractor={(recipe) => recipe.idMeal}
      renderItem={(recipe) => {
        if (recipe) {
          return (
            <RecipeItem idMeal={recipe.item.idMeal} navigation={navigation} />
          );
        }
      }}
    />
  );
}
