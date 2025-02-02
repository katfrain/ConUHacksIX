import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet} from 'react-native';
import { Image } from 'react-native';
import Home from '../screens/Home'
import Search from '../screens/Search'
import AddProduct from '../screens/AddProduct'
import Messages from '../screens/Messages'
import {Profile} from '../screens/Profile'


const Tab = createBottomTabNavigator();

function NavBar() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    margin: 20,
                    backgroundColor: '#545E66',
                    borderRadius: 10,
                    height: 40,
                    bottom: 20,
                    shadowColor: '#171717',
                    shadowOffset: {width: -2, height: 4},
                    shadowOpacity: 0.4,
                    shadowRadius: 4,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('../../assets/images/HomeIcon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 26,
                                    height: 26,
                                    tintColor: focused ? '#85A3BD' : '#FFF6DA',
                                }}
                            >
                            </Image>
                        </View>

                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('../../assets/images/SearchIcon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 26,
                                    height: 26,
                                    tintColor: focused ? '#85A3BD' : '#FFF6DA',
                                }}
                            >
                            </Image>
                        </View>

                    )
                }}
            />
            <Tab.Screen
                name="Plus"
                component={AddProduct}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('../../assets/images/PlusIcon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 65,
                                    height: 65,
                                    padding: 10,
                                    tintColor: focused ? '#545E66' : '#FFF6DA',
                                    backgroundColor: '#A94A4A',
                                    borderRadius: 10,
                                }}
                            >
                            </Image>
                        </View>

                    )
                }}
            />
            <Tab.Screen
                name="Messages"
                component={Messages}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('../../assets/images/ChatIcon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 26,
                                    height: 26,
                                    tintColor: focused ? '#85A3BD' : '#FFF6DA',
                                }}
                            >
                            </Image>
                        </View>

                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('../../assets/images/ProfileIcon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 26,
                                    height: 26,
                                    tintColor: focused ? '#85A3BD' : '#FFF6DA',
                                }}
                            >
                            </Image>
                        </View>

                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default NavBar;
const styles = StyleSheet.create({
    tabContainer: {
        position: 'absolute',
        margin: 20,
        backgroundColor: '#545E66',
        borderRadius: 10,
        height: 40,
        bottom: 20
    },

    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

})

