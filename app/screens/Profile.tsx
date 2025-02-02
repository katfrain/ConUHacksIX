import * as React from "react";
import {View, Image, Text, StyleSheet, FlatList, ActivityIndicator, Button} from "react-native";
import {db, FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {collection, query, where, getDocs, QuerySnapshot} from 'firebase/firestore';
import {pullUserItem} from "@/app/services/item";

interface ItemType {
    id?: string;
    User: string
    title: string;
    date: string;
    time: string;
    imgs: string[];
    description: string;
    freestat: boolean;
}

export const Profile= ()=> {
    const [loading, setLoading] = useState(true);

    const [items, setItems] = useState<ItemType[]>([]);

    const fetchData = async () => {
        try {
            const retrievedItems = await pullUserItem();
            setItems(retrievedItems);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);



    const PostItem = ({ items: items }: { items: ItemType }) => {
        console.log('******* Items to Post:', items);
        return (

            <View style={styles.postContainer}>
                <Text style={styles.title}>{items.title}</Text>
                <Text style={styles.description}>{items.description}</Text>
                <Text style={styles.date}>{items.date} - {items.time}</Text>

                {/* Display images if available */}
                {items.imgs && items.imgs.length > 0 && (
                    <FlatList
                        data={items.imgs}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        renderItem={({item}) => {
                            return<Image source={{uri: item}} style={styles.image}/>
                        }}
                    />
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : items.length === 0 ? (
                <Text style={styles.noPosts}>You haven't posted anything yet!</Text>
                // <Button title="Refresh" onPress={handleSubmit} />
            ) : (
                <FlatList
                    data={items}

                    keyExtractor={(item) => item.id? item.id.toString() : ''}
                    renderItem={({ item }) => <PostItem items={item} />}
                />
            )}
        </View>
    );
}


// Styles
const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: "#f9f9f9" },
    postContainer: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: { fontSize: 18, fontWeight: "bold" },
    description: { fontSize: 14, marginTop: 5 },
    date: { fontSize: 12, color: "gray", marginTop: 5 },
    image: { width: 150, height: 150, borderRadius: 8, margin: 5 },
    noPosts: { textAlign: "center", fontSize: 16, marginTop: 20, color: "gray" },
});



