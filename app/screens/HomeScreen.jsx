
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

import ItemCardTest from '@/components/itemCartTest';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { pullItem } from '@/app/services/item';
import {pullNonUserItem} from "@/app/services/nonUserService";



export const HomeScreen = () => {

    // 1) Define all state variables *at the top level* of the component
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    // 2) Define the async function inside the component
    const fetchData = async () => {
        try {
            const retrievedItems = await pullNonUserItem();
            setItems(retrievedItems);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // 3) useEffect calls `fetchData` on mount
    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, []);

    // 4) Handle loading or error states
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Error: {error}</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                height: 170,
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
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <ItemCardTest item={item}/>}
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
        </SafeAreaView>
    );
}

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


