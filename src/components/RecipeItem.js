import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getRecipeDetails } from "../services/RecipeAPI";
import { useAuth } from "../context/AuthContext";

export default function RecipeItem({ idMeal, navigation }) {
  const { token } = useAuth();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getRecipeDetails(token, idMeal);
      setRecipe(response);
    };
    fetch();
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("RecipeDetails", {
          recipeId: idMeal,
        });
      }}
    >
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{recipe.strMeal}</Text>
        <Text style={styles.description}>{recipe.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "1.5%",
    padding: "1.5%",
    backgroundColor: "#CCD1D1",
    borderRadius: 10,
  },
  image: {
    height: "100%",
    padding: "12%",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginTop: "auto",
    marginBottom: "auto",
    marginStart: "3%",
  },
  name: {
    fontWeight: "bold",
  },
  description: {
    marginTop: "1%",
  },
});
