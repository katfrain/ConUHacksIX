import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./Search.jsx";
import Post from "../Components/Post";

const Stack = createStackNavigator();

const SearchNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#545E66" },
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#FFF6DA",
                    fontFamily: "FredokaOne_400Regular",
                },
                headerTintColor: "#85A3BD",
            }}
        >
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Post" component={Post} />
        </Stack.Navigator>
    );
};

export default SearchNavigator;