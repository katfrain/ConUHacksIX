import React from "react";
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const ItemCardTest = ({item})=> {
    const navigation = useNavigation();
    const containerColor = item.type === "trade" ? "orange" : "green";

    const handlePress = () => {
        // Navigate to the post detail scren and pass the item as a parameter
        navigation.navigate("PostDetail", {item})
    }
    return (
    <TouchableOpacity onPress={handlePress} style={{width: "47%", marginVertical: 10, marginHorizontal: 5}}>
        <View style={styles.card}>
            <Image source={item.photo} style={styles.image}/>

            {/* Type Box placed below the image */}
            <View style = {[styles.typeContainer, {backgroundColor: containerColor}]}> 
                <Text style = {styles.type}>
                    {item.type=== 'trade' ? 'Trade' : 'Free'}
                </Text>
            </View>

            <View style = {styles.infoContainer}>
                <Text style = {styles.title} numberOfLines ={1} ellipsizeMode="tail">
                    {item.title}</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        position: "relative"

    },
    image: {
        width: '100%',
        height: 150
    },
    typeContainer: {
        position: "absolute",
        alignSelf: "flex-end",
        paddingHorizontal: 8,
        paddingVertical: 4,
        top: 8,
        right: 10,
        borderRadius: 5
    },
    type: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white',
    },
    infoContainer: {
        padding: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    }
    
});

export default ItemCardTest;