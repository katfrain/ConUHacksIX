import * as React from 'react';
import { Text, View } from "react-native";
import NavBar from './Components/NavBar';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer, NavigationIndependentTree} from "@react-navigation/native";
import tempHome from "@/app/screens/tempHome"
import Login from "@/app/screens/Login";
import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "@firebase/auth";
import {FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";

const Stack = createNativeStackNavigator();

export default function Index() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('User:', user);
            setUser(user);
            setLoading(false);
        });

        return unsubscribe; // Cleanup function to prevent memory leaks
    }, []);

    if (loading) {
        return null; // Or a loading spinner
    }

    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen name="Home" component={NavBar} />
                ) : (
                    <Stack.Screen name="LogIn" component={Login} />
                )}
            </Stack.Navigator>
    );
}

