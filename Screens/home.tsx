import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "@/Screens/HomeScreen";

export default function Index() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
