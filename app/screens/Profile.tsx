import * as React from "react";
import { View, Text, Button } from "react-native";
import { FIREBASE_AUTH } from "@/Configurations/FirebaseConfig";

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is Profile screen</Text>
      <Button title="Sign Out" onPress={() => FIREBASE_AUTH.signOut()}></Button>
    </View>
  );
}
