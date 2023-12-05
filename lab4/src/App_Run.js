import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Login_Page from './LoginPage';
import AddSer_Page from './AddSerPage';
import DetailSer_Page from './DetailSerPage';
import EditSer_Page from './EditSerPage';
import Home_Page from './HomePage';
import AppbarOption_Page from './AppbarOptionsPage';

import Transactions_Page from './Transactions';
import DetailTrans_Page from './DetailTrans';
import Customers_Page from './Customers';
import AddCus_Page from './AddCus';
import Logout_Page from './LogoutPage';

const Stack = createStackNavigator();

function HomeScreens() {
    return (
        <Stack.Navigator
            initialRouteName='HomeScreen'
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
        >
            <Stack.Screen
                name="Home"
                component={MyTabs}
            />
            <Stack.Screen
                name='AddService'
                component={AddSer_Page}
            />
            <Stack.Screen
                name='DetailService'
                component={DetailScreen}
            />
        </Stack.Navigator>
    )
}

function AppbarOptionScreen(){
    return (
        <Stack.Navigator
            initialRouteName='AppbarOptionScreen'
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
        >
            <Stack.Screen
                name='AppbarOption'
                component={AppbarOption_Page}
            />
            <Stack.Screen
                name="UpdateService"
                component={EditSer_Page}
            />

        </Stack.Navigator>
    )
}
function DetailScreen(){
    return (
        <Stack.Navigator
            initialRouteName='DetailScreen'
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
        >
            <Stack.Screen
                name='Detail'
                component={DetailSer_Page}
            />
            <Stack.Screen
                name="AppbarScreen"
                component={AppbarOptionScreen}
            />

        </Stack.Navigator>
    )
}

const TransactionsScreen =() =>{
    return (
    <Stack.Navigator
        initialRouteName='TransactionsScreen'
        activeColor="#e91e63"
        labelStyle={{ fontSize: 12 }}
        style={{ backgroundColor: 'tomato' }}
    >
        <Stack.Screen
            name='TransactionList'
            component={Transactions_Page}
        />
        <Stack.Screen
            name="TransactionDetail"
            component={DetailTrans_Page}
        />

    </Stack.Navigator>
    );
}

const CustomersScreen =() =>{
    return(
        <Stack.Navigator
        initialRouteName='CustomersScreen'
        activeColor="#e91e63"
        labelStyle={{ fontSize: 12 }}
        style={{ backgroundColor: 'tomato' }}
    >
        <Stack.Screen
            name='CustomerList'
            component={Customers_Page}
        />
        <Stack.Screen
            name="AddCustomer"
            component={AddCus_Page}
        />

    </Stack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='HomeScreen_Run'
            barStyle={{ backgroundColor: "blue" }}
        >
            <Tab.Screen name="Home"
                component={Home_Page}
                options={{
                    tabBarIcon: 'home',
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={TransactionsScreen}
                options={{
                    tabBarIcon: 'money',
                }}
            />
            <Tab.Screen
                name="Customer"
                component={CustomersScreen}
                options={{
                    tabBarIcon: 'user',
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Logout_Page}
                options={{
                    tabBarIcon: 'setting',
                }}
            />
        </Tab.Navigator>
    )
}
function App_Run() {
    return (
        <Stack.Navigator
            initialRouteName="AppScreen"
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='LoginScreen'
                component={Login_Page}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreens}
            />
        </Stack.Navigator>
    )
} 

export default App_Run;