import React, { useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  getCommentLike,
  addCommentLike,
  removeCommentLike,
} from "../services/RecipeAPI";
import { useAuth } from "../context/AuthContext";

export default function CommentLike({ comment }) {
  const [like, setLike] = useState(false);
  const { token, user } = useAuth();
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getCommentLike(token, comment.id);
      setLikes(result.likes);
      if (result.likes.length > 0) {
        if (result.likes.find((like) => like.user_id === user.id)) {
          setLike(true);
        }
      }
    };
    fetch();
  }, []);

  const onPress = async () => {
    try {
      if (like) {
        setLike(false);
        await removeCommentLike(token, comment.id);
        const result = await getCommentLike(token, comment.id);
        setLikes(result.likes);
      } else {
        setLike(true);
        await addCommentLike(token, comment.id);
        const result = await getCommentLike(token, comment.id);
        setLikes(result.likes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <IconButton
          size={20}
          icon={like ? "heart" : "heart-outline"}
          iconColor={like ? "red" : "grey"}
          onPress={() => onPress()}
        />
        <Text style={styles.likes}>{likes.length}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    position:'relative',
  },
  likes: {
    position:'absolute',
    left:0,
    right:0,
    bottom: '-20%',
    textAlign:'center'
  },
});
