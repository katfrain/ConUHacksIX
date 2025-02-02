import {getFirestore, collection, addDoc, getDocs, QuerySnapshot} from 'firebase/firestore';
import {db} from '@/Configurations/FirebaseConfig'
import {getAuth} from 'firebase/auth'

interface Props {
    title: string;
    imgs: string[];
    description: string;
    free: boolean;
}

const now = new Date();
const time =  Date.now();

export async function createItem({title,imgs,description,free}:Props){

    try {
        const auth = getAuth()
        const user = auth.currentUser

        await addDoc(collection(db,'items'),{
            User: user? (user.email) : null,
            title: title,
            Date: now.toString(),
            Time: time.toString(),
            imgs: imgs,
            description: description,
            freeStat: free,
        });
        console.log("stuff was sent")
    } catch (error) {
        console.log('error adding document', error);
    }
}

interface ItemType {
    id?: string; // We'll add the document ID here
    User: string
    title: string;
    date: string;
    time: string;
    img: string;
    description: string;
    freestat: boolean;
}


export async function pullItem(): Promise<ItemType[]> {
    try {
        //this pulls the collection
        const itemsRef = collection(db, 'items');
        //pulls a snapshot of the collection
        const querySnapshot = await getDocs(itemsRef);

        const docs = querySnapshot.docs;

        const items: ItemType[] = [];

        //querySnapshot.forEach((doc) => {
        for (let i = 0; i < 3; i++) {
            console.log ("Block statement execution no." + i);
            const doc = docs[i];
            const data = doc.data() as ItemType;
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
