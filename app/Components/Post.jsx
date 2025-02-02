import React from "react";
import {View, Text, Image, StyleSheet, Dimensions, SafeAreaView} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const imageSize = width * 0.8;
const spacing = 10;
let username = "camikin";
let name = "Cami Kin";
let profileImage =  require("../../assets/images/camikin.png");

const Post = ({ route }) => {
  const { item } = route.params;
  const containerColor = item.type === "trade" ? "#D0845F" : "#40A671";

  const photos = Array.isArray(item.photo) ? item.photo : [item.photo];

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>{name}'s Post</Text>
        <View style={[styles.imageContainer]}>
          <ScrollView
              horizontal
              decelerationRate={"fast"}
              showsHorizontalScrollIndicator={false}
              snapToInterval={imageSize + spacing}
              contentContainerStyle={{ paddingHorizontal: (width - imageSize) / 2 }}
          >
            {photos.map((photo, index) => (
                <View
                    key={index}
                    style={{ marginRight: index === photos.length - 1 ? 0 : spacing }}
                >
                  <Image
                      source={photo}
                      style={[styles.image, { width: imageSize, height: imageSize }]}
                  />
                </View>
            ))}
          </ScrollView>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View
            style={[styles.typeContainer, { backgroundColor: containerColor, borderRadius: 20 }]}
        >
          <Text style={styles.type}>
            {item.type === "trade" ? "Trade" : "Free"}
          </Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.profileContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.profileText}>@{username}</Text>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  imageContainer: {
    height: imageSize,
  },
  image: {
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginHorizontal: 40,
    marginVertical:20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginHorizontal: 40,
    marginVertical:20,
  },
  header: {
    color: '#545E66',
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: 'FredokaOne_400Regular',
    marginHorizontal: 40,
    marginVertical:20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 30,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  typeContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 40,
    borderRadius: 5,
  },
  type: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default Post;