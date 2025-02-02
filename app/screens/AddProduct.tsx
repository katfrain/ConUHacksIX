import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("free");
  // Explicitly set photos to be an array of strings (URIs)
  const [photos, setPhotos] = useState<string[]>([]);

  // Function to pick an image from the library
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // Make sure `result.assets` exists and is not empty
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
    }
  };

  const handleSubmit = () => {
    const newProduct = {
      title,
      description,
      type,
      photo: photos,
    };

    console.log("New product created:", newProduct);
    // Reset form (optional)
    setTitle("");
    setDescription("");
    setType("free");
    setPhotos([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Type selection */}
      <View style={styles.typeContainer}>
        <Text style={styles.label}>Type:</Text>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "free" && styles.typeButtonSelected,
          ]}
          onPress={() => setType("free")}
        >
          <Text style={styles.typeButtonText}>Free</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "trade" && styles.typeButtonSelected,
          ]}
          onPress={() => setType("trade")}
        >
          <Text style={styles.typeButtonText}>Trade</Text>
        </TouchableOpacity>
      </View>

      {/* Button to add photos */}
      <Button title="Add Photo" onPress={pickImage} />

      {/* Preview selected photos */}
      {photos.length > 0 && (
        <ScrollView horizontal style={styles.photoPreviewContainer}>
          {photos.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.photoPreview} />
          ))}
        </ScrollView>
      )}

      <Button title="Submit Post" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
  typeButtonSelected: {
    backgroundColor: "#ddd",
  },
  typeButtonText: {
    fontSize: 16,
  },
  photoPreviewContainer: {
    marginVertical: 15,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default AddProduct;
