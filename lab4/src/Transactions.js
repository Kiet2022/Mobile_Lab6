import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { Text, View, FlatList,TouchableOpacity } from 'react-native'
import { FAB } from "react-native-paper";

const Transactions_Page = ({navigation}) => {
    const [data, SetData] = useState([])
    const fetchData = async () => {
        const value = await AsyncStorage.getItem('Token');
        console.log(value);
        await fetch('https://kami-backend-5rs0.onrender.com/transactions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer:${value}`,
                'ConTent-Type': 'application/json'
            },
        }).then(res => res.json())
            .then((d) => {
                SetData(d)
                console.log(d)
            }).catch((error) => { console.error("Fetching error:", error) })
    }
    useEffect(() => {
        fetchData();
    }, []
    )
    const Item = ({ item }) => {
        return (
            <Text style={styles.itembox}>                
                <TouchableOpacity
                onPress={() => navigation.navigate('TransactionDetail', {_id:item._id})}
                >
                    <Text style={styles.content}>{item.id}- {item.createdAt}</Text>
                    <Text style={styles.price}>{item.price} VND</Text>
                    {item.services.map((service, index) => (
                        <Text key={index}>- {service.name}</Text>
                    ))}
                    <Text style={styles.content}>Customer: {item.customer.name}</Text>
                    </TouchableOpacity>               
            </Text>
        )
    }
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <Item item={item} />}
            />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AddService')}
            />
        </View>
    )
}

export default Transactions_Page;


const styles = StyleSheet.create({
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
    price:{
        fontSize:16,
        textAlign:"right",      
    },
})