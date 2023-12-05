import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DetailTrans_Page = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [price, setPrice] = useState(0);
    const [price_After_Discount, setPriceAfterDiscount] = useState(0);

    const route = useRoute();
    const { _id } = route.params;

    console.log(_id);
    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value);
        await fetch(`https://kami-backend-5rs0.onrender.com/transactions/${_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer:${value}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network was not ok ~~')
            }
            return response.json();
        }).then(async data => {
            setData(data);
            setIsLoading(false);
            setPrice(data.price);
            setPriceAfterDiscount(data.priceBeforePromotion);
            console.log(data);
        }).catch((error) => {
            console.error("Fetching error", error)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        fetchData();
    }, [])



    return (
        <View>
            <Text style={styles.itembox}>
                <View>
                    <Text style={styles.sub}>General information</Text>
                    <Text>Transaction code:<Text >{data.id}</Text></Text>
                    <Text>Customer        :<Text>{data._id}</Text></Text>
                    <Text>Created         :<Text>{data.createdAt}</Text></Text>
                </View>
            </Text>

            <Text style={styles.itembox}>
                <View>
                    <Text style={styles.sub}>Services list</Text>
                    <View>
                        {isLoading ? <Text>Loading...</Text> : data.services ? data.services.map((service, index) => (
                            <Text key={index}>- {service.name} <Text>x{service.quantity}  <Text style={Styles.price}>{service.price}VND</Text></Text></Text>
                        )) : null}
                        <Text style={styles.content}>Customer:  {isLoading ? <Text>Waiting for loading data...</Text> : data.customer.name ? <Text>{data.customer.name}</Text> : null}</Text>
                    </View>
                    <Text>Total money    :<Text>{data.priceBeforePromotion}VND </Text></Text>
                </View>
            </Text>

            <Text style={styles.itembox}>
                <View>
                    <Text style={styles.sub}>Cost</Text>
                    <Text>Total      :<Text >{data.priceBeforePromotion}VND</Text></Text>
                    <Text>Discount   :<Text>-{price - price_After_Discount}VND</Text></Text>
                    <Text>Payment    :<Text>{data.createdAt}</Text></Text>
                </View>
            </Text>

        </View>

    )
}
export default DetailTrans_Page;

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
    sub:{
        colors: 'red',
        fontSize:20,
        fontWeight:'bold',
    }
})