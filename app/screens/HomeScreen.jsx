import React, { useEffect, useState, useCallback } from "react";
import {
    TouchableOpacity,
    RefreshControl,
    View,
    Image,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { getAuth } from "firebase/auth";
import { pullNonUserItem } from "@/app/services/item";

const MainScreen = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    const fetchPosts = async () => {
        setLoading(true);
        const fetchedItems = await pullNonUserItem();
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


    const PostItem = ({ item }) => (
        <View style={styles.postContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.date}>{item.date} - {item.time}</Text>

            {/* Display images if available */}
            {item.imgs && item.imgs.length > 0 ? (
                <FlatList
                    data={item.imgs}
                    keyExtractor={(img, index) => index.toString()}
                    horizontal
                    renderItem={({ item: img }) => (
                        <Image source={{ uri: img }} style={styles.image} />
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
                    renderItem={({ item }) => <PostItem item={item} />}
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

export default MainScreen;
