import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FIREBASE_STORAGE } from "@/Configurations/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createItem } from "@/app/services/item";

const AddProduct = () => {
  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [free, setFree] = useState(true);
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);

  // Pick an image from the library
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
      setImageUris((prevUris) => [...prevUris, result.assets[0].uri]);
    }
  };

  // Upload images and create a new post
  const uploadData = async () => {
    if (!imageUris || imageUris.length === 0) return;
    let uploadedImages: string[] = [];

    for (const imageUri of imageUris) {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const fileName = `images/${Date.now()}.jpg`;
      const storageRef = ref(FIREBASE_STORAGE, fileName);
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      uploadedImages.push(downloadUrl);
    }

    if (!uploadedImages || uploadedImages.length === 0) return;
    await createItem({ title, imgs: uploadedImages, description, free });
  };

  // Handle submit
  const handleSubmit = async () => {
    await uploadData();
    alert(
      `Product "${title}" added successfully!\nLook for it in your profile.`
    );

    // Reset form fields
    setTitle("");
    setDescription("");
    setFree(true);
    setPhotos([]);
    setImageUris([]);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
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

        {/* Toggle between Free and Trade */}
        <View style={styles.typeContainer}>
          <Text style={styles.label}>Type:</Text>
          <TouchableOpacity
            style={[styles.typeButton, free && styles.typeButtonSelected]}
            onPress={() => setFree(true)}
          >
            <Text style={styles.typeButtonText}>Free</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, !free && styles.typeButtonSelected]}
            onPress={() => setFree(false)}
          >
            <Text style={styles.typeButtonText}>Trade</Text>
          </TouchableOpacity>
        </View>

        {/* Button to add photos */}
        <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
          <Text style={styles.addPhotoButtonText}>Add Photo</Text>
        </TouchableOpacity>

        {/* A container with a border that wraps the horizontal scroll of photos */}
        {photos.length > 0 && (
          <View style={styles.photoContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {photos.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={styles.photoPreview}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Submit button fixed closer to the bottom, but 15% up */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative", // So we can absolutely position buttonContainer
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "80%",
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
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "center",
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
    marginHorizontal: 5,
  },
  typeButtonSelected: {
    backgroundColor: "#ddd",
  },
  typeButtonText: {
    fontSize: 16,
  },
  addPhotoButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  addPhotoButtonText: {
    fontSize: 16,
  },
  photoContainer: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
    alignSelf: "center",
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "15%",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  submitButton: {
    backgroundColor: "blue",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddProduct;