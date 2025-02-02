import {View, Text, StyleSheet, Button} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import {FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";

const tempHome = () => {
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Button title="Sign Out" onPress={() => FIREBASE_AUTH.signOut()}></Button>
        </View>
    )
}

export default tempHome;