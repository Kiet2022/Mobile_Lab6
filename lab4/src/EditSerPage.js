import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import {  Update } from './api/agent';

const EditSer_Page = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errortext, setErrortext] = useState('');


    const route = useRoute();
    const { _id } = route.params;


    const handleSubmitPress = async () => {
        setErrortext('');
        if (!name) {
            alert('Please fill name');
            return;
        } else if (!price) {
            alert('Please fill price');
            return;
        } else {
            const value = await AsyncStorage.getItem('token');
            await fetch(`https://kami-backend-5rs0.onrender.com/services/${_id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${value}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: _id,
                    name: name,
                    price: price,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    Alert.alert('Update Successfully!!!')
                })
                .then((d) => {
                    setData(d)
                    console.log("c: ", d)
                    d.map((item) => {
                        console.log(item);
                    })
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    return (

        <View>
            <View style={{flex:2}}>
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
                            onChangeText={(price) =>
                                setPrice(price)
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
                        onPress={handleSubmitPress}>
                        <Text style={styles.buttonTextStyle}>ADD</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};
export default EditSer_Page;

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