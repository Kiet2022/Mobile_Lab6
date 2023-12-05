import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";

import { SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Button, FAB } from "react-native-paper";
import Edit_Page from './EditSerPage';


const AppbarOption_Page = ({navigation}) => {
    const handleDelete = () => {
        Alert.alert("Delete Succesfull!!!");
    }
    return (
        <View>
            <TouchableOpacity  onPress={() => navigation.navigate('UpdateService')}>
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