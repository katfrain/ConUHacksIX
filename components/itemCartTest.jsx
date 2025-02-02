import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ItemCardTest = ({ item }) => {
  const navigation = useNavigation();
  const containerColor = item.type === "trade" ? "#D0845F" : "#40A671";

  const handlePress = () => {
    // Navigate to the post detail scren and pass the item as a parameter
    navigation.navigate("Post", { item });
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ width: "47%", marginVertical: 10, marginHorizontal: 5 }}
    >
      <View style={styles.card}>
        <Image
          source={Array.isArray(item.photo) ? item.photo[0] : item.photo}
          style={styles.image}
        />
        {/* Type Box placed below the image */}
        <View
          style={[styles.typeContainer, { backgroundColor: containerColor, borderRadius: 20 }]}
        >
          <Text style={styles.type}>
            {item.type === "trade" ? "Trade" : "Free"}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  typeContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 4,
    top: 8,
    right: 10,
    borderRadius: 5,
  },
  type: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  infoContainer: {
    paddingTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Cabin',
    color: '#545E66',
  },
});

export default ItemCardTest;
