import * as React from "react";
import {TouchableOpacity, RefreshControl, View, Image, Text, StyleSheet, FlatList, ActivityIndicator, Button} from "react-native";
import {db, FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";
import {useEffect, useState, useCallback} from "react";
import {getAuth} from "firebase/auth";
import {collection, query, where, getDocs, QuerySnapshot} from 'firebase/firestore';
import {pullUserItem} from "@/app/services/item";
import {ITEMS} from "@/data-temp/items";
import ItemCardTest from "@/components/itemCartTest";

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

    // Function to fetch posts
    const fetchPosts = async () => {
        setLoading(true);
        const fetchedItems = await pullUserItem();
        setItems(fetchedItems);
        setLoading(false);
    };

    // Fetch posts on mount
    useEffect(() => {
        fetchPosts();
    }, []);

    // Refresh function for pull-down gesture
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    }, []);

    // Post item component
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
    },
    description: {
        fontSize: 14,
        marginTop: 5,
    },
    date: {
        fontSize: 12,
        color: "gray",
        marginTop: 5,
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
});

export default MyPostsScreen;
