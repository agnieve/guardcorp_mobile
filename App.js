import {StatusBar} from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import {useAtom} from "jotai";
import {user} from './atom/user';
import {useEffect} from "react";
import {getStorage} from "./utility/asyncStorage";

const Stack = createNativeStackNavigator();

export default function App() {

    function AuthStack() {
        return(
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#ccc' },
                    headerShown: false,
                    headerTintColor: 'white',
                    contentStyle: { backgroundColor: '#64748B' },
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        );
    }

    function AuthenticatedStack() {
        return(
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#ccc' },
                    headerTintColor: 'white',
                    // contentStyle: { backgroundColor: '#ccc' },
                }}
            >
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
            </Stack.Navigator>);
    }

     function Navigation(){
        const test = false;
        const [useUser, setUseUser] = useAtom(user);

        useEffect(()=> {
            (async () => {
                const result = await getStorage('user');
                if(result !== null){
                    setUseUser(result);
                }
            })();
        },[]);

        return (
            <NavigationContainer>
                {Object.entries(useUser).length === 0 ? <AuthStack /> : <AuthenticatedStack />}
            </NavigationContainer>
        );
    }

    return (
       <>
           <StatusBar style="light" />
           <Navigation />
       </>
    );
}
