import React, { useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { getLikes, addLike, removeLike } from "../services/RecipeAPI";
import { useAuth } from "../context/AuthContext";

export default function LikeButton({ recipeId }) {

  const [like, setLike] = useState(false);
  const { token, user } = useAuth();
  const [likes, setLikes] = useState([]);

  console.log(token, user);

  useEffect(() => {
    const fetch =  async()=>{
        const result = await getLikes(token, recipeId)
        setLikes(result.likes)
        if(result.likes.length>0){
            if(result.likes.find(like => like.user_id === user.id)){
                setLike(true)
            }
        }
    }
    fetch()
  }, []);

  const onPress = async () => {
    try {
      if (like) {
        setLike(false);
        await removeLike(token, recipeId);
        const result = await getLikes(token, recipeId)
        setLikes(result.likes)
      } else {
        setLike(true);
        await addLike(token, recipeId);
        const result = await getLikes(token, recipeId)
        setLikes(result.likes)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity>
      <View style= {styles.container}>
        <IconButton
          icon={like ? "heart" : "heart-outline"}
          iconColor={like ? "red" : "grey"}
          onPress={() => onPress()}
        />
        <Text style={styles.text}>{likes.length} Me gusta</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles= StyleSheet.create({
    container:{
        flexDirection: 'row'
    },
    text: {
        marginBottom: 'auto',
        marginTop: 'auto',
        paddingEnd: '4%'
    }
})
