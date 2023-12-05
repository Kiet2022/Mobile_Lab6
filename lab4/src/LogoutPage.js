import React from "react"
import { View, Text, TouchableOpacity } from 'react-native'
import Styles from "./Styles"

const Logout_Page = ({ navigation }) => {
    return (
        <View style={{alignItems: "center"}}>
            <TouchableOpacity
                style={Styles.button}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Logout_Page;