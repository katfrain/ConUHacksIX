//This will be to read and write data to firebase
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getDatabase, ref, onValue } from "firebase/database";
import {db} from '@/Configurations/FirebaseConfig'


const now = new Date();
const time =  Date.now();

async function createItem(){
    try {
        await addDoc(collection(db,'items'),{
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

const dg = getDatabase();
const starCountRef = ref(dg, 'posts/' + postId + '/starCount');

async function pullItem() {
    try {
        //this pulls the collection
        const data = collection(db, 'items');
        //pulls a snapshot of the collection
        const querySnapshot = await getDocs(data);

        const items = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            doc: doc.data(),
        }));
        console.log('Retrieved Items:', items);
        return items;
    } catch (error) {
        console.log('error pulling document', error);
    }
}


export default createItem; pullItem;
