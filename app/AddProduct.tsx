// import * as React from "react";
// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";

import * as React from "react";
import { View, Text } from "react-native";

export default function AddProduct() {
  return (
    <View>
      <Text>This is Add Product screen</Text>
    </View>
  );
}

// import * as ImagePicker from "expo-image-picker";

// const AddProduct = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [type, setType] = useState("free");
//   const [photo, setPhoto] = useState(null);
// };

// //function to pick an image from the library
// const pickImage = async () => {
//   const permissionResult =
//     await ImagePicker.requestMediaLibraryPermissionsAsync();
//   if (permissionResult.granted === false) {
//     alert("Permission to access camera roll is required!");
//     return;
//   }

//   let result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [1, 1],
//     quality: 1,
//   });

//   if (!result.cancelled) {
//     setPhoto(result.uri);
//   }
// };

// const handleSubmit = () => {
//     const newProdcut = {
//         title,
//     }
// }
