import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";
import {pullItem} from "@/Services/Items/MarketItem";
import newItems from "@/Services/Items/newItems";
import NewItems from "@/Services/Items/newItems";
import createItem from "@/Services/Items/newItems";


const tempHome = () => {

    const [input, setInput] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onCreateItem = async () => {
        try {
            // Call createItem with the current title
            await createItem({ title });
            // Optionally, clear the input and title after creation
            setInput('');
            setTitle('');
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    // log items to show tht it works
        async function displayItems() {
            const items = await pullItem();
            console.log(items);
        }
    return (
        <View style={styles.container}>
            <TextInput
                value={input}
                style={styles.input}
                placeholder={"e.g COEN314 Book"}
                autoCapitalize={"words"}
                onChangeText={(text) => {
                    setInput(text);
                    setTitle(title);
                }}
            ></TextInput>
            <TextInput
                value={description}
                style={styles.input}
                placeholder={"e.g Used COEN314 Book"}
                autoCapitalize={"sentences"}
                onChangeText={(text) => setDescription(text)}
            ></TextInput>
            {/* Button calls onCreateItem directly */}
            <Button title="Create Item" onPress={onCreateItem} />
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