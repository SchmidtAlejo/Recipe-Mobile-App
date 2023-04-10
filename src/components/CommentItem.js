import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CommentLike from "./CommentLike";

export default function CommentItem({ comment, user, remove }) {
  const renderRemover = () => {
    if (comment.user_id === user.id) {
      return <Text onPress={() => remove(comment.id)} style={styles.eliminate}>eliminar</Text>;
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.commentContainer}>
          <Text style={styles.user}>{user.username}</Text>
          <Text style={styles.comment}>{comment.text}</Text>
        </View>
        {renderRemover()}
      </View>
      <CommentLike comment={comment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  commentContainer: {
    backgroundColor: "#2ACA1D",
    flex: 1,
    padding: "2%",
    borderRadius: 10,
  },
  user: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  comment: {
    fontSize: 16,
    color: "white",
  },
  eliminate: {
    textAlign: 'right'
  }
  
});
