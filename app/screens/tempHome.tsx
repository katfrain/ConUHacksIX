import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import React, {useState} from 'react';
import {FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";


const tempHome = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    return (
        <View style={styles.container}>
            <TextInput
                value={title}
                style={styles.input}
                placeholder={"e.g COEN314 Book"}
                autoCapitalize={"words"}
                onChangeText={(text) => setTitle(text)}
            ></TextInput>
            <TextInput
                value={description}
                style={styles.input}
                placeholder={"e.g Used COEN314 Book"}
                autoCapitalize={"sentences"}
                onChangeText={(text) => setDescription(text)}
            ></TextInput>
            <Button title="Sign Out" onPress={() => FIREBASE_AUTH.signOut()}></Button>
        </View>
    )
}

export default tempHome;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical : 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    }
})