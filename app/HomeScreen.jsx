import React from "react";
import { FlatList, SafeAreaView, StyleSheet, View, Text } from "react-native";
import ItemCardTest from "../components/itemCartTest";
import { ITEMS } from "../data-temp/items.jsx";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemCardTest item={item} />}
        numColumns={2} //Displays 2 collumns
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{
          paddingBottom: 50,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  list: {
    paddingBottom: 50,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
