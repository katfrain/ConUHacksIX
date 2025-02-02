import * as React from "react";
import {TouchableOpacity, View, Image, Text, StyleSheet, FlatList, ActivityIndicator, Button} from "react-native";
import {db, FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import {collection, query, where, getDocs, QuerySnapshot} from 'firebase/firestore';
import {pullUserItem} from "@/app/services/item";
import {ITEMS} from "@/data-temp/items";
import ItemCardTest from "@/components/itemCartTest";

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

let username = "camikin";
let name = "Cami Kin";
let profileImage =  require("../../assets/images/camikin.png");
let major = "Computer Engineering"

export default function Profile() {
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
    <View style={styles.Container}>

        <View style={styles.profileHeader}>
            <View style={styles.profileContainer}>
                <Image source={profileImage} style={styles.profileImage} />
                <Text style={styles.profileText}>@{username}</Text>
            </View>
            <Text style={styles.majorText}>{major}</Text>
            <View>
                <TouchableOpacity
                    style={styles.signOut}
                    onPress={() => FIREBASE_AUTH.signOut()}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Cabin' }}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </View>

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


    </View>
  );
}

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
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "flex-start",
        backgroundColor: '#fff',
    },
    profileHeader: {
        backgroundColor: '#545E66',
        width: '100%',
        height: '25%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 20,
    },
    profileImage: {
        width: 90,
        height: 90,
        marginRight: 10,
        transform: [{translateY: 25}],
    },
    profileText: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#FFF6DA',
        // transform: [{translateY: -25}],
        fontFamily: 'Cabin'
    },
    majorText: {
        fontSize: 20,
        color: '#FFF6DA',
        marginLeft: 130,
        transform: [{translateY: -40}],
        fontFamily: 'Cabin'
    },
    signOut: {
        backgroundColor: '#85A3BD',
        width: 100,
        borderRadius: 10,
        alignItems: "center",
        padding: 3,
        marginHorizontal: 130,
        transform: [{translateY: -30}],
    },
    columnWrapper: {
        justifyContent: "space-between",
        paddingHorizontal: 0,
    },
    postsContainer: {
        transform: [{translateY: "28%"}],
        paddingBottom: "28%"
    },
    postsSubtitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#545E66',
        fontFamily: 'FredokaOne_400Regular',
        marginLeft: 15,
    }
})