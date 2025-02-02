import * as React from 'react';
import { View, Text } from 'react-native';
import {FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";
import {onAuthStateChanged, User} from "@firebase/auth";
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";



export default function Home() {
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <View>
            <Text>This is Home screen</Text>
            {user ? (
                <Text>Welcome, User ID: {user.email}</Text>
            ) : (
                <Text>No user logged in</Text>
            )}
        </View>
    );
}