import {View, Text, Button, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import {FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";
import {ITEMS} from "@/data-temp/items";
import ItemCardTest from "@/components/itemCartTest";

let username = "camikin";
let name = "Cami Kin";
let profileImage =  require("../../assets/images/camikin.png");
let major = "Computer Engineering"

export default function Profile() {
    return (
        <View style={styles.Container}>
            <View style={styles.profileHeader}>
                <View style={styles.profileContainer}>
                    <Image source={profileImage} style={styles.profileImage} />
                    <Text style={styles.profileText}>@{username}</Text>
                </View>
                <Text style={styles.majorText}>{major}</Text>
                <View>
                    <TouchableOpacity
                        style={styles.signOut}
                        onPress={() => FIREBASE_AUTH.signOut()}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Cabin' }}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.postsContainer}>
                <Text style={styles.postsSubtitle}>Your Posts</Text>
                <FlatList
                    data={ITEMS}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <ItemCardTest item={item}/>}
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "flex-start",
        backgroundColor: '#fff',
    },
    profileHeader: {
        backgroundColor: '#545E66',
        width: '100%',
        height: '25%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 20,
    },
    profileImage: {
        width: 90,
        height: 90,
        marginRight: 10,
        transform: [{translateY: 25}],
    },
    profileText: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#FFF6DA',
        // transform: [{translateY: -25}],
        fontFamily: 'Cabin'
    },
    majorText: {
        fontSize: 20,
        color: '#FFF6DA',
        marginLeft: 130,
        transform: [{translateY: -40}],
        fontFamily: 'Cabin'
    },
    signOut: {
        backgroundColor: '#85A3BD',
        width: 100,
        borderRadius: 10,
        alignItems: "center",
        padding: 3,
        marginHorizontal: 130,
        transform: [{translateY: -30}],
    },
    columnWrapper: {
        justifyContent: "space-between",
        paddingHorizontal: 0,
    },
    postsContainer: {
        transform: [{translateY: "28%"}],
        paddingBottom: "28%"
    },
    postsSubtitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#545E66',
        fontFamily: 'FredokaOne_400Regular',
        marginLeft: 15,
    }
})