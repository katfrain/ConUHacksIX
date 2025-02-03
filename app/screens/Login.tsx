// made using tutorial "Super Easy React Native AUTHENTICATION with Firebase" by Simon Grimm (youtube)

import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { FIREBASE_AUTH } from "@/Configurations/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:live\.)?concordia\.ca$/;
import {
  useFonts,
  FredokaOne_400Regular,
} from "@expo-google-fonts/fredoka-one";
import {
  Cabin_400Regular,
  Cabin_500Medium,
  Cabin_600SemiBold,
  Cabin_700Bold,
  Cabin_400Regular_Italic,
  Cabin_500Medium_Italic,
  Cabin_600SemiBold_Italic,
  Cabin_700Bold_Italic,
} from "@expo-google-fonts/cabin";
import React from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    if (!emailRegex.test(email)) {
      alert("Email address ending in @concordia.ca is required!");
      setLoading(false);
      return;
    }
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (err: any) {
      console.log(err);
      alert("Sign in failed" + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Sign up was succesful!");
    } catch (err: any) {
      console.log(err);
      alert("Registration failed" + err.message);
    } finally {
      setLoading(false);
    }
  };

  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    Cabin_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.body}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/LoginImage.png")}
          style={{
            width: "100%",
            height: 400,
          }}
        ></Image>
        <Text style={styles.header}>UniTrade</Text>
        <Text style={styles.subtitle}>Helping Students Help Eachother</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.login}>login</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            value={email}
            style={styles.input}
            placeholder={"netname@live.concordia.ca"}
            autoCapitalize={"none"}
            onChangeText={(text) => setEmail(text)}
            // onBlur={() => {
            //   if (!emailRegex.test(email)) {
            //     console.log(email);
            //     alert("Email address ending in @concordia.ca is required!");
            //     //setEmail("");
            //   }
            //}}
          ></TextInput>
          <TextInput
            value={password}
            secureTextEntry={true}
            style={styles.input}
            placeholder={"Password"}
            autoCapitalize={"none"}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>

          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <>
              <TouchableOpacity style={styles.LoginButton} onPress={signIn}>
                <Text
                  style={{ color: "white", fontSize: 24, fontFamily: "Cabin" }}
                >
                  login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.LoginButton} onPress={signUp}>
                <Text
                  style={{ color: "white", fontSize: 24, fontFamily: "Cabin" }}
                >
                  sign up!
                </Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#545E66",
  },

  container: {
    marginHorizontal: 50,
    flex: 1,
    justifyContent: "center",
    transform: [{ translateY: -100 }],
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#FFF6DA",
    color: "#FFF6DA",
    fontFamily: "Cabin",
  },
  header: {
    fontFamily: "FredokaOne_400Regular",
    fontSize: 64,
    fontWeight: "bold",
    position: "absolute",
    top: 80,
    color: "#FFF6DA",
  },
  paragraph: {
    fontFamily: "Cabin",
    fontSize: 24,
  },
  subtitle: {
    fontFamily: "Cabin",
    fontSize: 28,
    paddingHorizontal: 20,
    position: "absolute",
    top: 200,
    color: "#FFF6DA",
    textAlign: "center",
  },
  login: {
    fontFamily: "Cabin",
    fontSize: 64,
    color: "#FFF6DA",
  },
  LoginButton: {
    backgroundColor: "#85A3BD",
    color: "#FFF6DA",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
  },
});
