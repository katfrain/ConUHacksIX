import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getDatabase, ref, onValue } from "firebase/database";
import {db} from '@/Configurations/FirebaseConfig'
import firebase from "firebase/compat";
import {getAuth} from 'firebase/auth'
import {Text} from "react-native";
import * as React from "react";

interface Props {
    title: string;
    img: string;
    description: string;
    freestat: boolean;
}

const now = new Date();
const time =  Date.now();

async function createItem({title,img,description,freestat}:Props){
    try {
        const auth = getAuth()
        const user = auth.currentUser

        await addDoc(collection(db,'items'),{
            User: user? (user.email) : null,
            title: title,
            Date: now.toString(),
            Time: time.toString(),
            img: img,
            description: description,
            freestat: freestat,
        });
        console.log("stuff was sent")
    } catch (error) {
        console.log('error adding document', error);
    }
}

export default createItem;