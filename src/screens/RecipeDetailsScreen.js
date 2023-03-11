import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getRecipeDetails } from "../services/RecipeAPI";
import { useAuth } from "../context/AuthContext";
import FavoriteButton from "../components/FavoriteButton";
import LikeButton from "../components/LikeButton";

export default function RecipeDetailsScreen({ route, navigation }) {
  const { token } = useAuth();
  const recipeId = route.params.recipeId;
  const [recipe, setRecipe] = useState([]);
  const [instructions, setInstrucction] = useState(false);
  const [ingridient, setIngridient] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await getRecipeDetails(token, recipeId);
      setRecipe(response);
    };
    fetch();
  }, []);

  const renderIngridient = (strIngredient, strMeasure) => {
    if (strIngredient) return <Text>{`${strIngredient} (${strMeasure})`}</Text>;
  };

  const remderInstructions = () => {
    if (instructions) {
      return (
        <View>
          <Text style={styles.headersText}>Instructions:</Text>
          <Text>{recipe.strInstructions}</Text>
        </View>
      );
    } else {
      return <Text style={styles.headersText}>Show instructions</Text>;
    }
  };

  const remderIngridients = () => {
    if (ingridient) {
      return (
        <View>
          <Text style={styles.headersText}>Ingriedients:</Text>
          {renderIngridient(recipe.strIngredient1, recipe.strMeasure1)}
          {renderIngridient(recipe.strIngredient2, recipe.strMeasure2)}
          {renderIngridient(recipe.strIngredient3, recipe.strMeasure3)}
          {renderIngridient(recipe.strIngredient4, recipe.strMeasure4)}
          {renderIngridient(recipe.strIngredient5, recipe.strMeasure5)}
          {renderIngridient(recipe.strIngredient6, recipe.strMeasure6)}
          {renderIngridient(recipe.strIngredient7, recipe.strMeasure7)}
          {renderIngridient(recipe.strIngredient8, recipe.strMeasure8)}
          {renderIngridient(recipe.strIngredient9, recipe.strMeasure9)}
          {renderIngridient(recipe.strIngredient10, recipe.strMeasure10)}
          {renderIngridient(recipe.strIngredient11, recipe.strMeasure11)}
          {renderIngridient(recipe.strIngredient12, recipe.strMeasure12)}
          {renderIngridient(recipe.strIngredient13, recipe.strMeasure13)}
          {renderIngridient(recipe.strIngredient14, recipe.strMeasure14)}
          {renderIngridient(recipe.strIngredient15, recipe.strMeasure15)}
          {renderIngridient(recipe.strIngredient16, recipe.strMeasure16)}
          {renderIngridient(recipe.strIngredient17, recipe.strMeasure17)}
          {renderIngridient(recipe.strIngredient18, recipe.strMeasure18)}
          {renderIngridient(recipe.strIngredient19, recipe.strMeasure19)}
          {renderIngridient(recipe.strIngredient20, recipe.strMeasure20)}
        </View>
      );
    } else {
      return <Text style={styles.headersText}>Show ingridients</Text>;
    }
  };

  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.image}>
        <ImageBackground
          source={{
            uri: recipe.strMealThumb,
          }}
          style={{
            width: "100%",
            height: 200,
            position: "relative",
          }}
          resizeMode="cover"
        >
          <View style={styles.likePosition}>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <LikeButton recipeId={recipeId} />
            </View>
            <View style={styles.button}>
              <FavoriteButton recipeId={recipeId} />
            </View>
          </View>
        </ImageBackground>
      </View>
      <View>
        <Text style={styles.title}>{recipe.strMeal}</Text>
      </View>
      <View style={styles.textContiner}>
        <Text style={styles.headersText}>Description:</Text>
        <Text>Area: {recipe.strArea}</Text>
        <Text>Category: {recipe.strCategory}</Text>
      </View>
      <TouchableOpacity
        style={styles.textContiner}
        onPress={() => setInstrucction(!instructions)}
      >
        {remderInstructions()}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.textContiner}
        onPress={() => setIngridient(!ingridient)}
      >
        {remderIngridients()}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 0.25,
    width: "100%",
  },
  scrollview: {
    flex: 1,
    paddingBottom: "5%",
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginHorizontal: "2%",
    justifyContent: "space-between",
    height: "100%",
    flexDirection: 'row'
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    marginBottom: "2%",
  },
  title: {
    margin: "5%",
    fontWeight: "bold",
    fontSize: 20,
  },
  textContiner: {
    backgroundColor: "#D7DBDD",
    margin: "1%",
    padding: "2%",
    borderRadius: 5,
  },
  headersText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  likePosition: {
    justifyContent: "flex-end",
  },
});
