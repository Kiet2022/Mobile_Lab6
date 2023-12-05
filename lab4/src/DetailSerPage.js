import React, { useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { useRoute } from "@react-navigation/native";

const DetailSer_Page = ({navigation}) => {
    const route = useRoute();

    const [data, setData] = useState([]);
    const { _id } = route.params;


    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value)
        await fetch(`https://kami-backend-5rs0.onrender.com/services/${_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d)
                console.log("d: ", d)
                setIsLoading(false)
                d.map((item) => {
                    console.log(item);
                })
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false)
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <View>
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title="Detail" />
            <Appbar.Action icon="dots-vertical" onPress={() => navigation.navigate('AppbarScreen', { _id: title._id })} />
        </Appbar.Header>
        <View>
            <View style={{flexDirection: 'row'}}> <Text variant="bodyLarge">Service name: </Text><Text variant="labelSmall">{data.name}</Text></View>
            <View style={{flexDirection: 'row'}}> <Text variant="bodyLarge">Price: </Text><Text variant="labelSmall">{data.price}</Text></View>
            {/*<View style={{flexDirection: 'row'}}> <Text variant="bodyLarge">Creator: </Text><Text variant="labelSmall">{data.map}</Text></View>*/}
            <View style={{flexDirection: 'row'}}> <Text variant="bodyLarge">Created: </Text><Text variant="labelSmall">{data.createdAt}</Text></View>
            <View style={{flexDirection: 'row'}}> <Text variant="bodyLarge">Updated:</Text><Text variant="labelSmall">{data.updatedAt}</Text></View>
        </View>
        </View>
    );
};
export default DetailSer_Page;

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