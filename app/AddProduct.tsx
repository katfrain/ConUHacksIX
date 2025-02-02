import * as React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {firebase} from '@/Configurations/FirebaseConfig'
import {useState} from "react";

const AddProduct = () => {
    const todoRef = firebase.firestore().collection('postProduct');
    const [addProduct, setAddProduct] = useState<boolean>(true);
}





export default function AddProduct() {

    return (
        <View>
            <Text>This is Add Product screen</Text>
            <TextInput
                value={email}
                style={styles.input}
                placeholder={"netname@concordia.ca"}
                autoCapitalize={"none"}
                onChangeText={(text) => setEmail(text)}

                }
                }
            ></TextInput>
            <>
                <Button title={"Post"} onPress={Post} />
                <Button title={"Sign up"} onPress={signUp} />
            </>
        </View>


    );
}