import * as React from "react";
import {TouchableOpacity, RefreshControl, View, Image, Text, StyleSheet, FlatList, ActivityIndicator, Button} from "react-native";
import {db, FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";
import {useEffect, useState, useCallback} from "react";
import {getAuth} from "firebase/auth";
import {collection, query, where, getDocs, QuerySnapshot} from 'firebase/firestore';
import {pullUserItem} from "@/app/services/item";
import {ITEMS} from "@/data-temp/items";
import ItemCardTest from "@/components/itemCartTest";

let username = "camikin";
let name = "Cami Kin";
let profileImage =  require("../../assets/images/camikin.png");
let major = "Computer Engineering"

interface ItemType {
    id?: string;
    User: string;
    title: string;
    date: string;
    time: string;
    imgs: string[];
    description: string;
    freestat: boolean;
}

const MyPostsScreen = () => {
    const [items, setItems] = useState<ItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        const fetchedItems = await pullUserItem();
        setItems(fetchedItems);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    }, []);

    const PostItem = ({ items }: { items: ItemType }) => (
        <View style={styles.postContainer}>
            <Text style={styles.title}>{items.title}</Text>
            <Text style={styles.description}>{items.description}</Text>
            <Text style={styles.date}>{items.date} - {items.time}</Text>

            {/* Display images if available */}
            {items.imgs && items.imgs.length > 0 ? (
                <FlatList
                    data={items.imgs}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                />
            ) : (
                <Text>No images available</Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
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

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : items.length === 0 ? (
                <Text style={styles.noPosts}>You haven't posted anything yet!</Text>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => (item.id ? item.id.toString() : '')}
                    renderItem={({ item }) => <PostItem items={item} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    postContainer: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'Cabin',
    },
    description: {
        fontSize: 14,
        marginTop: 5,
        fontFamily: 'Cabin',
    },
    date: {
        fontSize: 12,
        color: "gray",
        marginTop: 5,
        fontFamily: 'Cabin',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 8,
    },
    noPosts: {
        textAlign: "center",
        fontSize: 16,
        color: "gray",
    },
    profileHeader: {
        backgroundColor: '#545E66',
        width: '100%',
        top: 0,
        left: 0,
        borderRadius: 10,
        marginBottom: 20
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

});

export default MyPostsScreen;
