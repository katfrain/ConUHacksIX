import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Home from './Home'
import Search from './Search'
import AddProduct from './AddProduct'
import Messages from './Messages'
import Profile from './Profile'


const Tab = createBottomTabNavigator();

function NavBar() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    margin: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                    height: 70,
                },
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Plus" component={AddProduct} />
            <Tab.Screen name="Messages" component={Messages} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default NavBar;