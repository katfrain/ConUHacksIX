import React from "react";
import {Image, FlatList, SafeAreaView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import ItemCardTest from "../../components/itemCartTest";
import {ITEMS} from "../../data-temp/items.jsx";

const HomeScreen = () => {
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
            <FlatList
                data={ITEMS}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <ItemCardTest item={item}/>}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={{
                    paddingBottom: 50,
                    flexGrow: 1,
                }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    columnWrapper: {
        justifyContent: "space-between",
        paddingHorizontal: 0,
    },
});

export default HomeScreen;
