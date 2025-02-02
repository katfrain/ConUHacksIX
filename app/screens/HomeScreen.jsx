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
    SafeAreaView,
} from "react-native";
import { getAuth } from "firebase/auth";
import { pullNonUserItem } from "@/app/services/item";
import {useNavigation} from "@react-navigation/native";

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


    const PostItem = ({item}) => {

        const navigation = useNavigation();
        const containerColor = item.type === "trade" ? "#D0845F" : "#40A671";

        const handlePress = () => {
            // Navigate to the post detail scren and pass the item as a parameter
            navigation.navigate("Post", { item });
        };

        return (
            <TouchableOpacity
                onPress={handlePress}
                style={{ width: "47%", marginVertical: 10, marginHorizontal: 5 }}
            >
                <View style={styles.card}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                            {item.title}
                        </Text>
                    </View>

                    {item.imgs && item.imgs.length > 0 ? (
                        <Image
                            source={{uri: Array.isArray(item.imgs) ? item.imgs[0] : item.imgs}}
                            style={styles.image}
                        />
                    ) : (
                        <Text>No images available</Text>
                    )}

                    <View style={[styles.typeContainer, { backgroundColor: containerColor, borderRadius: 20 }]}
                    >
                        <Text style={styles.freestat}>
                            {item.freestat ?  "Trade" : "Free"}
                        </Text>
                    </View>



                </View>
            </TouchableOpacity>
    );
}

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                height: 170,
            }}>
                <Image source={require("assets/images/marketplaceImage.png")} />
                <Text
                    style={{ color: '#FFF6DA', fontSize: 24, transform: [{ translateY: -100 }], marginHorizontal: 50, fontFamily: 'FredokaOne_400Regular'}}
                >What are you looking for today?</Text>
            </View>
            <View >
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
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                        contentContainerStyle={{
                            paddingBottom: 50,
                            flexGrow: 1,
                            // shadowColor: "#000",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            // elevation: 3,
                            // shadowOffset: {width: -2, height: 4},
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    postContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
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
    noPosts: {
        textAlign: "center",
        fontSize: 16,
        color: "gray",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        overflow: "hidden",
        position: "relative",
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
    typeContainer: {
        position: "absolute",
        alignSelf: "flex-end",
        paddingHorizontal: 8,
        paddingVertical: 4,
        top: 8,
        right: 10,
        borderRadius: 5,
    },
    freestat: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    infoContainer: {
        paddingTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: 'Cabin',
        color: '#545E66',
    },
});

export default MainScreen;
