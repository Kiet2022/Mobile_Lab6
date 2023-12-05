import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';


const AddCus_Page = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errortext, setErrortext] = useState('');


    async function handleAddCustomer() {
        setErrortext('');
        if (!name) {
            Alert.alert('Please fill name');
            return;
        } else if (!price) {
            Alert.alert('Please fill phone');
            return;
        } else {
            const value = await AsyncStorage.getItem('token')
            console.log(value);
            await fetch('https://kami-backend-5rs0.onrender.com/customers', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${value}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    phone: phone,

                    name: name,
                }),
            })
                .then(res => res.json())
                .then(async data => {
                    console.log(data)
                })

                .catch(error => { console.log(error) });
            Alert.alert('Add successfully');
        }
    }
    return (
        <View>
            <View style={{ flex: 2 }}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={name =>
                                setName(name)
                            }
                            placeholder="Enter service name"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(phone) =>
                                setPhone(phone)
                            }
                            placeholder="Enter price"
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
                        onPress={handleAddCustomer}>
                        <Text style={styles.buttonTextStyle}>ADD</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    );

}
export default AddCus_Page;


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