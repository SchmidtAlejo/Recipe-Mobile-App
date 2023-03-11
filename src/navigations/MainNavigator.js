import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "./HomeNavigator";
import LoginNavigator from "./AuthNavigator";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const { isSigned } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isSigned ? (
        <Stack.Screen name="LoginNavigator" component={LoginNavigator} />
      ) : (
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}