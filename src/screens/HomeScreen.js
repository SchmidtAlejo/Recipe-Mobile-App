import React, { useEffect } from "react";
import { Text, Button } from "react-native-paper";
import { StatusBar, StyleSheet, View, ImageBackground } from "react-native";
import { getFavoritesRecipes } from "../services/RecipeAPI";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  
  const goToSearchIngridientScreen = () => {
    navigation.navigate("SearchIngridient");
  };

  return (
    <ImageBackground
      source={require("./../../assets/home.jpg")}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>RecipesApp</Text>
        <Text style={styles.subtitle}>
          You can search for recipes that you can make with the ingredients you
          are looking for
        </Text>
        <Button
          onPress={goToSearchIngridientScreen}
          style={styles.button}
          mode="contained"
          buttonColor="#1A85E5"
        >
          Let's start!
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    marginBottom: "auto",
    marginStart: "auto",
    marginEnd: "auto",
  },
  imageBackground: {
    marginTop: StatusBar.currentHeight,
    width: "100%",
    position: "relative",
    height: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: "10%",
    marginTop: "5%",
  },
  button: {
    marginTop: "15%",
    marginStart: "auto",
    marginEnd: "auto",
  },
});
