import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const imageSize = width * 0.8;
const spacing = 10;

const Post = ({ route }) => {
  const { item } = route.params;

  const photos = Array.isArray(item.photo) ? item.photo : [item.photo];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        snapToInterval={imageSize + spacing}
        contentContainerStyle={{ paddingHorizontal: (width - imageSize) / 2 }}
        style={[styles.imageContainer, { width: width, height: imageSize }]}
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
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});

export default Post;
