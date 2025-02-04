import {getFirestore, collection, addDoc, getDocs, QuerySnapshot, where, query, orderBy} from 'firebase/firestore';
import {db} from '@/Configurations/FirebaseConfig'
import {getAuth} from 'firebase/auth'

interface ItemType2 {
    id?: string; // We'll add the document ID here
    User: string
    title: string;
    date: string;
    time: string;
    imgs: string[];
    description: string;
    freeStat: boolean;

}


export async function pullNonUserItem(): Promise<ItemType2[]> {
    try {
        const auth = getAuth()
        const user = auth.currentUser
        //this pulls the collection
        const itemsRef = collection(db, 'items');
        //pulls a snapshot of the collection

        if(!user){
            return [];
        }
        const q =
            query(itemsRef,
            orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q);

        const docs = querySnapshot.docs;

        const items: ItemType2[] = [];

        //querySnapshot.forEach((doc) => {
        for(var doc of docs){
            const data = doc.data() as ItemType2;
            items.push({
                id: doc.id,
                ...data,
            });
        }

        console.log('Retrieved Items:', items);
        const filteredItems = items.filter(item => item.User !== user?.email)
        return filteredItems;

    } catch (error) {
        console.log('error pulling document', error);
        return [];
    }
}