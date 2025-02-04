
import {getFirestore, collection, addDoc, getDocs, QuerySnapshot, where, query} from 'firebase/firestore';
import {db} from '@/Configurations/FirebaseConfig'
import {getAuth} from 'firebase/auth'
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

interface ItemType1 {
    id?: string; // We'll add the document ID here
    User: string
    title: string;
    date: string;
    time: string;
    imgs: string[];
    description: string;
    freeStat: boolean;
    createdAt: Timestamp;
}

export async function pullUserItem(): Promise<ItemType1[]> {
    try {
        const auth = getAuth()
        const user = auth.currentUser
        //this pulls the collection
        const itemsRef = collection(db, 'items');
        //pulls a snapshot of the collection

        if(!user){
            return [];
        }

        const q = user.email !== '' ? query(itemsRef, where('User', '==', user.email)) : itemsRef;
        const querySnapshot = await getDocs(q);

        const docs = querySnapshot.docs;


        const items: ItemType1[] = [];
        //querySnapshot.forEach((doc) => {
        for(var doc of docs){
            const data = doc.data() as ItemType1;
            items.push({
                id: doc.id,
                ...data,
            });
        }
        console.log('Retrieved Items:', items);
        return items;

    } catch (error) {
        console.log('error pulling document', error);
        return [];
    }

}