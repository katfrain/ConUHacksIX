import React, { useState } from "react";
import {View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FIREBASE_STORAGE, FIREBASE_FIRESTORE } from "@/Configurations/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {createItem} from "@/app/services/item";


const AddProduct = () => {
  // for product doc (firebase)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [free, setFree] = useState(true);
  const [imageUris, setImageUris] =  useState<string[]>([]); // for making blob
  const [photos, setPhotos] = useState<string[]>([]); // photos array for UI

  // Function to pick an image from the library
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

    // Make sure `result.assets` exists and is not empty
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
      setImageUris((prevUris) => [...prevUris, result.assets[0].uri]); // array of image URIs
    }
  };

  const uploadData = async () => {

    if (!imageUris || imageUris.length===0) return;

    console.log( "uris:" + imageUris);

    let uploadedImages: string[] = [];

    // upload every image and store the reference
    for(var imageUri of imageUris) {
      const response = await fetch(imageUri);

      const blob = await response.blob();
      const fileName = `images/${Date.now()}.jpg`;
      const storageRef = ref(FIREBASE_STORAGE, fileName);
      await uploadBytes(storageRef, blob);

      const downloadUrl = await getDownloadURL(storageRef);
      uploadedImages.push(downloadUrl);
    }


    if(!uploadedImages || uploadedImages.length === 0) return;
    console.log("uploaded imgs: " +uploadedImages);
    await createItem({ title, imgs: uploadedImages, description, free})

  }

  const handleSubmit = async () => {

    await uploadData();

    console.log("New product created:", title);

    // reset form
    setTitle("");
    setDescription("");
    setFree(true);
    setPhotos([]);
    setImageUris([]);

    alert("Product \"" + title + "\" added successfully! \n Look for it in your profile.");

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
            free === true && styles.typeButtonSelected,
          ]}
          onPress={() => setFree(true)}
        >
          <Text style={styles.typeButtonText}>Free</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            free === false && styles.typeButtonSelected,
          ]}
          onPress={() => setFree(false)}
        >
          <Text style={styles.typeButtonText}>Trade</Text>
        </TouchableOpacity>
      </View>

      {/* Button to add photos */}
      <Button title="Add Photo" onPress={pickImage} />
      <Button title="Submit Post" onPress={handleSubmit} />

      {/* Preview selected photos */}
      {photos.length > 0 && (
        <ScrollView horizontal style={styles.photoPreviewContainer}>
          {photos.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.photoPreview} />
          ))}
        </ScrollView>
      )}


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
