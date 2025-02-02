import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import Post from "../Post"; // Or any other detailed screen

const Stack = createStackNavigator();

const ProfileNavigator = () => {
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
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;