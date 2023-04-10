import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import CommentItem from "./CommentItem";

export default function CommentsList({ comments, user, remove }) {
  return (
    <FlatList
      data={comments}
      renderItem={(comment) => {
        if (comment) {
          return (
            <CommentItem comment={comment.item} user={user} remove={remove} />
          );
        }
      }}
    />
  );
}
