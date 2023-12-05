import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Button, FlatList, TouchableOpacity } from "react-native"
import { FAB } from "react-native-paper";

const Customers_Page = ({ navigation }) => {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value)
        await fetch('https://kami-backend-5rs0.onrender.com/customers', {
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
                console.log("d: ", d._id)
                d.map((item) => {
                    console.log(item);
                })
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
    const Item = ({ title }) => (
        <Text style={styles.itembox}>
            <View>
                <Text style={styles.content}>Customer :{title.name}</Text>
                <Text style={styles.content}>Phone    :{title.phone}</Text>
                <Text styles={styles.content}>Spend   :{title.totalSpent}</Text>
            </View>
        </Text>
    );
    return (

        <SafeAreaView style={styles.container}>
            <Button style={styles.button}
                title="+"
                onPress={() => navigation.navigate('')} />
            <FlatList
                data={data}
                renderItem={({ item }) => <Item title={item} />}
                keyExtractor={item => item._id}
            />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AddCustomer')}
            />
        </SafeAreaView>
    );
};
export default Customers_Page;
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:48,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    itembox:{
        borderColor:AppTheme.colors.border,
        borderWidth:1,
        width:'100%',
        marginTop:10,
        borderRadius:15,
        paddingLeft:10,
    },
    content:{
        fontSize:16,
        fontWeight:'bold',
        textAlign: 'left',
    },
    button:{
        backgroundColor:AppTheme.colors.primary,
        borderRadius:15,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        marginTop:16,
    },
})