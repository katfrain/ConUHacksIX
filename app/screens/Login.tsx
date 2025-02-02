// made using tutorial "Super Easy React Native AUTHENTICATION with Firebase" by Simon Grimm (youtube)

import {View, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView} from 'react-native';
import {useState} from "react";
import {FIREBASE_AUTH} from "@/Configurations/FirebaseConfig"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";

const emailRegex = /^[a-zA-Z0-9._%+-]+@live.concordia\.ca$/;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        }
        catch(err: any){
            console.log(err);
            alert('Sign in failed' + err.message);
        }
        finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Sign up was succesful!')
        }
        catch(err: any){
            console.log(err);
            alert('Registration failed' + err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder={"netname@concordia.ca"}
                    autoCapitalize={"none"}
                    onChangeText={(text) => setEmail(text)}
                    onBlur={() => {
                        if(!emailRegex.test(email)){
                            alert('Email address ending in @concordia.ca is required!');
                            setEmail('');
                        }
                    }
                    }
                ></TextInput>
                <TextInput value={password} secureTextEntry={true} style={styles.input} placeholder={"Password"} autoCapitalize={"none"} onChangeText={(text) => setPassword(text)} ></TextInput>

                {loading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : (
                    <>
                        <Button title={"Login"} onPress={signIn} />
                        <Button title={"Sign up"} onPress={signUp} />
                    </>
                )
                }
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login;

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