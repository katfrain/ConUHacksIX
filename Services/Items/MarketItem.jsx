//This will be to read and write data to firebase

import firestore from "@react-native-firebase/firestore";

const now = new Date();
const time = new Date.now();

async function createItem(){
    try {
        await firestore().collection('items').add({
            title: 'computer',
            Date: now.toString(),
            Time: time.toString(),
            img: 'https://cdn.discordapp.com/attachments/1180008691458658425/1334703709778874490/tractor.jpg?ex=679f7972&is=679e27f2&hm=8fe3e7a712718af12dfebf957af5d664d8e9418a8196d2324550579573b12728&',
            description: 'This item is an item',
            tag: 'IT',
        });
    } catch (error) {
        console.log('error adding document', error);
    }
}

export default createItem;

