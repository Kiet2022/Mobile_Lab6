import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";

import { SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { FAB } from "react-native-paper";


const Home_Page = ({navigation}) => {
    const [data, setData] = useState([])
    const filePath = 'https://kami-backend-5rs0.onrender.com/services'

    useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('NetWork response was not ok')
                }
                return response.json();
            })
            .then((d) => {
                console.log(d);
                setData(d);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);



    const Item = ({ title }) => (
        <View>
        <TouchableOpacity  onPress={() => navigation.navigate('DetailService', { _id: title._id })}>
            <Text >{title.name}</Text>
            <Text >{title.price}</Text>
        </TouchableOpacity>
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text >SERVICES</Text>
                <FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={() => navigation.navigate('AddService')}
                />
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item title={item} />}
                keyExtractor={item => item._id}
            />
        </SafeAreaView>
        // </ScrollView>
    );
};
export default Home_Page;

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      top: 0,
    },
})