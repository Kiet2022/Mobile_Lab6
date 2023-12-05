import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from 'npm i @react-native-async-storage/async-storage';

const Login_Page = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');

    const handleSubmitPress = async () => {
        setErrortext('');
        if (!name) {
            alert('Please fill name');
            return;
        } else if (!price) {
            alert('Please fill price');
            return;
        } else {
        await fetch('https://kami-backend-5rs0.onrender.com/auth', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: '0373007856',
                password: '123'
            })}).then(response => response.json())
            .then(async data => {
                console.log(data);
                await AsyncStorage.setItem('token',data.token);
                await navigation.navigate('Service');
            }
            ).catch(error => console.error(error));
        }
    }

    return (
        <View>
            <View style={{flex: 1}}><Text>Kami Login</Text></View>
            <View style={{flex:2}}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={email =>
                                setUserEmail(email)
                            }
                            placeholder="Enter Email"
                            keyboardType="email-address"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(pass) =>
                                setUserPassword(pass)
                            }
                            placeholder="Enter Password"
                            secureTextEntry={true}
                        />
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitPress}>
                        <Text style={styles.buttonTextStyle}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.registerTextStyle}
                        onPress={() => navigation.navigate('RegisterScreen')}>
                        New Here ? Register
                    </Text>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};
export default Login_Page;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});