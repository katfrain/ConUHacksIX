import React, { useState } from "react";
import {View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FIREBASE_STORAGE, FIREBASE_FIRESTORE } from "@/Configurations/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import createItem from "@/app/services/item";



const AddProduct = () => {
  // for product doc (firebase)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [freeStat, setFreeStat] = useState("");
  const [img, setImg] = useState<string | null>(null);

  const [type, setType] = useState("free");
  const [photo, setPhoto] = useState<string | null>(null); // for UI
  const [imageUri, setImageUri] = useState<string | null>(null); // for making blob

  // Function to pick an image from the library
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if(!result.canceled && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
    }

  };

  const uploadData = async () => {

    if (!imageUri) return;

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const fileName = `images/${Date.now()}.jpg`;
    const storageRef = ref(FIREBASE_STORAGE, fileName);
    await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(storageRef);
    setImg(downloadUrl);

    if(!img) return;

    await createItem({ title, img, description, freeStat:false})

  }

  const handleSubmit = async () => {

    await uploadData();

    console.log("New product created:", title);


    // Reset form
    setTitle("");
    setDescription("");
    setType("free");
    setPhoto(null);
    alert("Successfully uploaded!");
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

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <Text style={styles.imagePickerText}>Pick an Image</Text>
        )}
      </TouchableOpacity>

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
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  imagePickerText: {
    fontSize: 16,
    color: "#666",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
});

export default AddProduct;
