import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Image } from 'react-native';
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
                    backgroundColor: '#545E66',
                    borderRadius: 10,
                    height: 60,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', transform: [{ translateY: 10 }]}}>
                            <Image
                                source={require('../assets/images/HomeIcon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 35,
                                    height: 35,
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
                        <View style={{alignItems: 'center', justifyContent: 'center', transform: [{ translateY: 10 }]}}>
                            <Image
                                source={require('../assets/images/SearchIcon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 35,
                                    height: 35,
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
                        <View style={{alignItems: 'center', justifyContent: 'center', transform: [{ translateY: 10 }]}}>
                            <Image
                                source={require('../assets/images/PlusIcon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 65,
                                    height: 65,
                                    padding: 10,
                                    tintColor: focused ? '#545E66' : '#FFF6DA',
                                    backgroundColor: '#85A3BD',
                                    transform: [{ translateY: -15 }],
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
                        <View style={{alignItems: 'center', justifyContent: 'center', transform: [{ translateY: 10 }]}}>
                            <Image
                                source={require('../assets/images/ChatIcon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 35,
                                    height: 35,
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
                        <View style={{alignItems: 'center', justifyContent: 'center', transform: [{ translateY: 10 }]}}>
                            <Image
                                source={require('../assets/images/ProfileIcon.png')}
                                resizeMode="contain"
                                style={{
                                    width: 35,
                                    height: 35,
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