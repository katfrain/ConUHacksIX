import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppNavigatorHome from "./AppNavigatorHome";

export default function Home() {
  return (
    <View style={styles.container}>
      <AppNavigatorHome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
