import React from "react";
import {TouchableOpacity, View, Text, Image, StyleSheet, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileItemCart = ({item}) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate("Post", {item});
    };
    return (
        <TouchableOpacity
            onPress={handlePress}
        >
            <View style={styles.postContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>{item.date} - {item.time}</Text>

                {/* Display images if available */}
                {item.imgs && item.imgs.length > 0 ? (
                    <FlatList
                        data={item.imgs}
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
        </TouchableOpacity>
    );

}
const styles = StyleSheet.create({
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
});

export default ProfileItemCart;