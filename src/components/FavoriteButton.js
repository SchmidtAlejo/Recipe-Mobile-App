import React, { useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { getFavoritesRecipe, addFavorite, removeFavorite } from "../services/RecipeAPI";
import { useAuth } from "../context/AuthContext";

export default function FavoriteButton({ recipeId }) {

  const [isDisabled, setIsDisabled] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetch =  async()=>{
        const result = await getFavoritesRecipe(token, recipeId);
        if(result.recipe){
            setFavorito(true);
        }
    }
    fetch()
  }, []);


  const onPress = async () => {
    try {
      if (favorito) {
        setFavorito(false);
        setIsDisabled(true);
        await removeFavorite(token, recipeId);
        setIsDisabled(false);
      } else {
        setFavorito(true);
        setIsDisabled(true);
        await addFavorite(token, recipeId);
        setIsDisabled(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity>
      <View>
        <IconButton
          icon={favorito ? "star" : "star-outline"}
          iconColor={favorito ? "#2ACA1D" : "grey"}
          onPress={() => onPress()}
          disabled={isDisabled}
        />
      </View>
    </TouchableOpacity>
  );
}