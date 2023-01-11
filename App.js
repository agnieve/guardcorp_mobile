import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import {useAtom} from "jotai";
import {site, user} from './atom/user';
import {useEffect} from "react";
import {getStorage} from "./utility/asyncStorage";
import ConfirmLocationScreen from "./screens/ConfirmLocationScreen";
import {Text} from "react-native";
import CustomHeader from "./components/CustomHeader";
import VerifyLicenseScreen from "./screens/VerifyLicenseScreen";
import SiteInductionScreen from "./screens/SiteInductionScreen";
import DashboardHeader from "./components/DashboardHeader";

const Stack = createNativeStackNavigator();

export default function App() {

    function AuthStack() {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {backgroundColor: '#ccc'},
                    headerShown: false,
                    headerTintColor: 'white',
                    contentStyle: {backgroundColor: '#64748B'},
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen}/>
            </Stack.Navigator>
        );
    }

    function AuthenticatedStack(props) {

        const {userData, siteData} = props;

        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {backgroundColor: '#ccc'},
                    headerTintColor: 'white',
                }}
            >
                <Stack.Screen
                    options={{
                        headerTitle: () => <CustomHeader title={'Confirm Location'} icon={'business'} userData={userData}/>,
                        headerStyle: {backgroundColor: '#475c6f'},
                        headerTintColor: '#fff'
                    }}
                    name="ConfirmLocation" component={ConfirmLocationScreen}/>
                <Stack.Screen
                    options={{
                        headerTitle: () => <CustomHeader title={'Verify License'} icon={'fingerprint'} userData={userData} siteData={siteData}/>,
                        headerStyle: {backgroundColor: '#475c6f'},
                        headerTintColor: '#fff'
                    }}
                    name="VerifyLicense" component={VerifyLicenseScreen}/>
                <Stack.Screen
                    options={{
                        headerTitle: () => <CustomHeader title={'Site Induction'} icon={'article'} userData={userData} siteData={siteData}/>,
                        headerStyle: {backgroundColor: '#475c6f'},
                        headerTintColor: '#fff'
                    }}
                    name="SiteInduction" component={SiteInductionScreen}/>
                <Stack.Screen options={{
                    headerTitle: () => <DashboardHeader title={'Site Induction'} icon={'article'} userData={userData} siteData={siteData}/>,
                    headerBackVisible: false,
                    headerStyle: {backgroundColor: '#475c6f'},
                    headerTintColor: '#fff'
                }} name="Dashboard" component={DashboardScreen}/>
            </Stack.Navigator>);
    }

    function Navigation() {
        const [useUser, setUseUser] = useAtom(user);
        const [useSite, setUseSite] = useAtom(site);

        useEffect(() => {
            (async () => {
                const result = await getStorage('user');
                if (result !== null) {
                    setUseUser(result);
                }

            })();
        }, []);

        return (
            <NavigationContainer>
                {useUser === null ? <AuthStack/> :
                    <AuthenticatedStack
                        siteData={useSite}
                        userData={useUser}
                    />}
            </NavigationContainer>
        );
    }

    return (
        <>
            <StatusBar style="light"/>
            <Navigation/>
        </>
    );
}
