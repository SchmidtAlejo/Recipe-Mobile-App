import React from 'react';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useState } from 'react'
import { View, ActivityIndicator, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('schmidtalejo@gmail.com');
    const [password, setPassword] = useState('password');
    const { Login } = useAuth();
    const [visible, setVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');

    const isIncompleteData = !email || !password;

    const onSubmit = async () => {
        if (isIncompleteData) {
            setSnackbarText('All fields are required');
            setVisible(true);
            return;
        }
        try {
            setIsLoading(true);
            await Login(email, password);
        } catch (err) {
            console.log(err);
            setSnackbarText('Wrong email and/or password');
            setVisible(true);
            setIsLoading(false);
            return;
        }
    };

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/login.jpg')
                }
                style={{
                    width: '100%',
                    position: 'relative',
                    height: '100%'
                }}
            >
                <ScrollView>
                    {isLoading ? (
                        <View style={{ flex: 1, justifyContent: 'center', marginTop: '70%' }}>
                            <ActivityIndicator size='large' color='white' />
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.title}>
                                RecipesAPP
                            </Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    activeUnderlineColor='grey'
                                    mode='flat'
                                    label='Email'
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    style={styles.input}
                                    keyboardType={'email-address'}
                                />
                                <TextInput
                                    activeUnderlineColor='grey'
                                    mode='flat'
                                    label='Password'
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    style={styles.input}
                                    secureTextEntry={true}
                                />
                            </View>
                            <Button
                                style={styles.button}
                                onPress={onSubmit}
                                mode={'contained'}
                                buttonColor='#1A85E5'
                            >
                                Submit
                            </Button>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.register}>
                                    Don't have an account?
                                </Text>
                            </TouchableOpacity>
                            <Snackbar
                                visible={visible}
                                onDismiss={onDismissSnackBar}
                                action={{
                                    label: 'Close',
                                    onPress: () => {
                                        setVisible(!visible)
                                    },
                                }}
                                duration={2000}
                            >
                                {snackbarText}
                            </Snackbar>
                        </View>
                    )}
                </ScrollView>

            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
        marginTop: '30%',
        backgroundColor: '#1A85E5',
        padding: '5%',
        marginHorizontal: '15%',
        borderRadius: 100
    },
    inputContainer: {
        marginTop: '15%',
    },
    input: {
        margin: '5%',
    },
    button: {
        marginTop: '10%',
        marginStart: 'auto',
        marginEnd: 'auto',
    },
    register: {
        marginTop: '4%',
        textAlign: 'center',
        color: 'white'
    }
})