import 'react-native-gesture-handler';
import React from "react";

import {  Text, View, TouchableOpacity, Alert } from 'react-native'



const AppbarOption_Page = ({navigation}) => {
    const route = useRoute();
    const { _id } = route.params;

    const handleDelete = () => {
        Alert.alert("Delete Succesfull!!!");
    }
    return (
        <View>
            <TouchableOpacity  onPress={() => navigation.navigate('UpdateService', { _id: _id })}>
                <Text >Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={handleDelete}>
                <Text >Delete</Text>
            </TouchableOpacity>
        </View>
    );
};
export default AppbarOption_Page;

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
})