import React from 'react';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import { useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { Register } = useAuth();
  const [visible, setVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const isIncompleteData = !email || !password || !confirmPassword;

  const onSubmit = async () => {
    if (isIncompleteData) {
      setSnackbarText('All fields are required');
      setVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      setSnackbarText("Passwords don't match");
      setVisible(true);
      return;
    }
    try {
      setIsLoading(true);
      await Register(email, username, password);
    } catch (err) {
      setSnackbarText('Email already registered');
      setVisible(true);
      setIsLoading(false);
      return;
    }
  };

  const onDismissSnackBar = () => setVisible(false);
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
    <ScrollView>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', marginTop: '70%' }}
        >
          <ActivityIndicator size='large' color='white' />
        </View>
      ) : (
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>Complete the fields</Text>
            <TextInput
              activeUnderlineColor='#2ACA1D'
              underlineColor='#2ACA1D'
              mode='flat'
              label='Email'
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              keyboardType={'email-address'}
            />
            <TextInput
              activeUnderlineColor='#2ACA1D'
              underlineColor='#2ACA1D'
              mode='flat'
              label='Username'
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
              keyboardType={'email-address'}
            />
            <TextInput
              activeUnderlineColor='#2ACA1D'
              underlineColor='#2ACA1D'
              mode='flat'
              label='Password'
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
            <TextInput
              activeUnderlineColor='#2ACA1D'
              underlineColor='#2ACA1D'
              mode='flat'
              label='Confirm password'
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              style={styles.input}
                  secureTextEntry={!isConfirmPasswordVisible}
                  right={
                    <TextInput.Icon
                      onPress={toggleConfirmPasswordVisibility}
                      icon="eye"
                      forceTextInputFocus={false}
                    />
                  }
            />
          </View>
          <Button
            style={styles.button}
            onPress={onSubmit}
            mode={'contained'}
            buttonColor='#2ACA1D'
          >
            Submit
          </Button>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Close',
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
    marginTop: StatusBar.currentHeight,
  },
  inputContainer: {
    marginTop: '35%',
    marginHorizontal: '5%'
  },
  input: {
    marginVertical: '5%',
  },
  button: {
    marginTop: '10%',
    marginStart: 'auto',
    marginEnd: 'auto'
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20
  },
});
