import * as React from "react";
import { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ITEMS } from "../../data-temp/items";
import ItemCardTest from "../../components/itemCartTest.jsx";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  const filteredItems = ITEMS.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
      <View style={styles.container}>
        <TextInput
            style={styles.searchBar}
            placeholder="Type to search..."
            value={query}
            onChangeText={setQuery}
        />
        <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ItemCardTest item={item} />}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={{
              paddingBottom: 50,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#545E66",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginHorizontal: 15,
    color: "#545E66",
    fontFamily: 'Cabin'
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
});