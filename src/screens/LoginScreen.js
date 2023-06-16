import React from "react";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Login, LoginByToken } = useAuth();
  const [visible, setVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isIncompleteData = !email || !password;

  async function goTo() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      await LoginByToken(token);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    goTo();
  }, []);

  const onSubmit = async () => {
    if (isIncompleteData) {
      setSnackbarText("All fields are required");
      setVisible(true);
      return;
    }
    try {
      setIsLoading(true);
      await Login(email, password);
    } catch (err) {
      setSnackbarText("Wrong email and/or password");
      setVisible(true);
      setIsLoading(false);
      return;
    }
  };

  const onDismissSnackBar = () => setVisible(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center", marginTop: "70%" }}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <View>
            <Text style={styles.title}>RecipesAPP</Text>
            <View style={styles.inputContainer}>
              <TextInput
                activeUnderlineColor="#2ACA1D"
                underlineColor="#2ACA1D"
                mode="flat"
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                keyboardType={"email-address"}
              />
              <View>
                <TextInput
                  activeUnderlineColor="#2ACA1D"
                  underlineColor="#2ACA1D"
                  mode="flat"
                  label="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={styles.input}
                  secureTextEntry={!isPasswordVisible}
                  right={
                    <TextInput.Icon
                      onPress={togglePasswordVisibility}
                      icon="eye"
                      forceTextInputFocus={false}
                    />
                  }
                />
              </View>
            </View>
            <Button
              style={styles.button}
              onPress={onSubmit}
              mode={"contained"}
              buttonColor="#2ACA1D"
            >
              Submit
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.register}>Don't have an account?</Text>
            </TouchableOpacity>
            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: "Close",
                onPress: () => {
                  setVisible(!visible);
                },
              }}
              duration={2000}
            >
              {snackbarText}
            </Snackbar>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    marginHorizontal: "10%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: "#2ACA1D",
    borderRadius: 100,
  },
  inputContainer: {
    marginTop: "15%",
  },
  input: {
    marginVertical: "5%",
  },
  button: {
    marginStart: "auto",
    marginEnd: "auto",
  },
  register: {
    marginTop: "5%",
    textAlign: "center",
  },
});
