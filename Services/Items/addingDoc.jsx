import firestore from '@react-native-firebase/firestore';

const submitPost = async () => {
    firestore()
        .collection('post')
        .add({
            title,
            Date,
            Time,,
            img,
            description,
            tag,
        })
}