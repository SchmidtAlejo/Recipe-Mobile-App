import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchIngridientScreen from "../screens/SearchIngridientScreen";
("./../screens/SearchIngridientScreen");
import DrawerNavigator from "./DrawerNavigator";
import RecipesScreen from "../screens/RecipesScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerTitle: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchIngridient"
        component={SearchIngridientScreen}
        options={{
          headerTitle: "Select the ingridient"
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipesScreen}
        options={{
          headerTitle: 'Recipes'
        }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{
          headerTitle: "Details"
        }}
      />
    </Stack.Navigator>
  );
}
