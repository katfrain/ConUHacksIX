
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



export const ListDisplay = () => {


    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);


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



