import {getFirestore, collection, addDoc, getDocs, QuerySnapshot} from 'firebase/firestore';
import {db} from '@/Configurations/FirebaseConfig'
import {getAuth} from 'firebase/auth'

interface Props {
    title: string;
    img: string;
    description: string;
    freeStat: boolean;
}

const now = new Date();
const time =  Date.now();

async function createItem({title,img,description,freeStat}:Props){
    alert("in creating item");
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
            freeStat: freeStat,
        });
        console.log("stuff was sent")
    } catch (error) {
        console.log('error adding document', error);
    }
}

export default createItem;
