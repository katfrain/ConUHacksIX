
import React, {useState, useEffect, useCallback} from 'react';
import {
    Image,
    FlatList,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator, RefreshControl,
} from 'react-native';
import {ListDisplay} from "@/components/listDisplay";
import ItemCardTest from '@/components/itemCartTest';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { pullItem } from '@/app/services/item';
import {pullNonUserItem} from "@/app/services/nonUserService";



export const HomeScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                height: 148,
            }}>
                <Image source={require("@/assets/images/marketplaceImage.png")}/>
                <Text
                    style={{
                        color: '#FFF6DA',
                        fontSize: 24,
                        transform: [{translateY: -100}],
                        marginHorizontal: 50,
                        fontFamily: 'FredokaOne_400Regular',
                    }}
                >What are you looking for today?</Text>
                {/*<Text style={{color: '#545E66', fontSize: 24, transform: [{translateY: -50}], marginLeft: 15}}>Filter*/}
                {/*    Placeholder</Text>*/}

            </View>
            <ListDisplay />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    // columnWrapper: {
    //     justifyContent: "space-between",
    //     paddingHorizontal: 0,
    // },
});


