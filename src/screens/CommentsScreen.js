import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View, TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import CommentsList from "../components/CommentsList";
import { useAuth } from "../context/AuthContext";
import { getComments, addComment, removeComment } from "../services/RecipeAPI";

export default function CommentsScreen({ route, navigation }) {
  const recipeId = route.params.recipeId;

  const { token, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch();
  }, []);

  
  const fetch = async () => {
    const response = await getComments(token, recipeId);
    setComments(response.comments);
  };

  const postNewComment = async () => {
    if(newComment){
      await addComment(token, recipeId, newComment);
      setNewComment('')
      fetch();
    }
  }

  const remove = async (commentId) => {
    await removeComment(token, commentId)
    fetch();
  }

  return (
    <View style={styles.container}>
      <CommentsList comments={comments} user={user} remove={remove}/>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Comment"
          underlineColor="#2ACA1D"
          activeUnderlineColor="#2ACA1D"
          multiline={true}
          style={styles.input}
          onChangeText={(text)=> setNewComment(text)}
          value={newComment}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={()=>postNewComment()}
            >
          <IconButton
            icon={"send"}
            iconColor={"#2ACA1D"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    margin: "2%",
    padding: "3%",
    marginEnd: "1%",
    borderRadius: 10,
    backgroundColor: "#D7DBDD",
  },
  button: {
    alignSelf: "center",
    alignContent: "center",
  },
});
