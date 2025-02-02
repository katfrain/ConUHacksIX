import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import Post from "./Post";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: "Marketplace"}}
            />
            <Stack.Screen
                name="Post"
                component={Post}
                options={{title: "Post"}}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator;