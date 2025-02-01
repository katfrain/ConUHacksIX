import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer, NavigationIndependentTree} from "@react-navigation/native";
import tempHome from "@/app/screens/tempHome"
import Login from "@/app/screens/Login";
import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "@firebase/auth";
import {FIREBASE_AUTH} from "@/Configurations/FirebaseConfig";



const Stack = createNativeStackNavigator()

// ------------------------ this is just for testing after login
// its equivalent (navigation) can, and should be, moved to a different file in our navigation folder later on
const InsideStack = createNativeStackNavigator()

function InsideLayout() {
    return(
        <InsideStack.Navigator>
            <InsideStack.Screen name="tempHome" component={tempHome} />
        </InsideStack.Navigator>
    )
}
// ------------------------


export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user', user);
            setUser(user);
        });
    }, []);

    return (
                <Stack.Navigator initialRouteName="LogIn">
                    {user ? (
                        <Stack.Screen name={"Home"} component={InsideLayout} options={{headerShown:false}} />
                        ) : (
                        <Stack.Screen name={"LogIn"} component={Login} />
                    )}
                </Stack.Navigator>
    )
}
