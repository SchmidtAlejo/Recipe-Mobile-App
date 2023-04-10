import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import { getIngridients } from "../services/RecipeAPI";

export default function Autocomplete({ navigation }) {
  const { token } = useAuth();
  const [query, setQuery] = useState("");
  const [ingridients, setIngridients] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (query !== "") {
        const response = await getIngridients(token, query);
        setIngridients(response);
      } else {
        setIngridients([]);
      }
    };
    fetch();
  }, [query]);

  return (
    <ImageBackground
      source={require("./../../assets/search.jpg")}
      style={styles.image}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Ingridient"
          onChangeText={(text) => setQuery(text)}
          style={styles.input}
          mode="outlined"
          outlineColor="#2ACA1D"
          activeOutlineColor="#2ACA1D"
        />
        <FlatList
          style={styles.flatlistContainer}
          data={ingridients}
          keyExtractor={(ingridient) => ingridient.idIngredient}
          renderItem={(ingridient) => {
            if (ingridient) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Recipe", {
                      ingridient: ingridient.item,
                    });
                  }}
                >
                  <Text style={styles.item}>
                    {ingridient.item.strIngredient}
                  </Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    position: "relative",
    height: "100%",
  },
  container: {
    marginHorizontal: "5%",
    marginTop: "10%",
  },
  input: {
    backgroundColor: "white",
  },
  flatlistContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    maxHeight: "80%",
  },
  item: {
    margin: '2%',
    fontSize: 16,
  },
});
