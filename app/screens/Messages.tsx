import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Messages() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Direct Messages coming soon!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Takes full height of the screen
        justifyContent: "center", // Centers content vertically
        alignItems: "center", // Centers content horizontally
    },
    text: {
        fontSize: 32, // Adjust size as needed
        textAlign: "center",
        margin: 20,
        fontWeight: "bold",
        fontFamily: "FredokaOne_400Regular",
        color: "#545E66", // Adjust color as needed
    },
});