import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../HomeScreen";
import Post from "../Post";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator
          screenOptions={{
              headerStyle: {
                  backgroundColor: "#545E66", // Background color of the header
              },
              headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#FFF6DA",
                  fontFamily: 'FredokaOne_400Regular',
              },
              headerBackTitleStyle: {
                  fontFamily: 'CabinAppNavigator.jsx', // Ensures back button text uses the same font
                  fontSize: 18,
              },
              headerTintColor: "#85A3BD",
          }}
      >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Marketplace" }}
      />
      <Stack.Screen name="Post" component={Post} options={{ title: "Post" }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
