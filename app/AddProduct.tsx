import * as React from 'react';
import { View, Text } from 'react-native';
import {onAuthStateChanged, User} from "@firebase/auth";
import firebase from "firebase/compat";
import {getAuth} from 'firebase/auth'
import auth = firebase.auth;
import {FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";
import {NULL} from "turbo-stream/dist/utils";



export default function AddProduct(){
    const auth = getAuth()
    const user = auth.currentUser
        return (
        <View>
            {user?(<Text>{user.email}</Text>):null}
            <Text>This is Add Product screen</Text>
        </View>
    );
}