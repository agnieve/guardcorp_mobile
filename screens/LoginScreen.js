import {Image, Text, View} from "react-native";
import {useEffect, useState} from "react";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import {verifyLicense} from "../utility/api/verifyLicense";
import {saveStorage} from "../utility/asyncStorage";
import {useAtom} from "jotai";
import {user} from "../atom/user";
import VerifyModal from "../components/loginComp/VerifyModal";

export default function LoginScreen() {

    const [license, setLicense] = useState("");
    const [error, setError] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [userSuccess, setUserSuccess] = useState({});

    const [useUser, setUseUser] = useAtom(user);

    async function login() {
        try {
            const result = await verifyLicense(license);

            if(result.message){
                setError(result.message);
            }else{
                setModalVisible(true);
                setUserSuccess(result);
            }
        } catch (e) {
            setError(e.message);
        }
    }

    async function userVerified(){
        await saveStorage('user', userSuccess);
        setUseUser(userSuccess);
    }

    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 3000)
    }, [error]);

    return (
        <View className={'flex-1'}>
            <VerifyModal userVerified={userVerified} data={userSuccess} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <View className="px-5 py-20">
                <Image style={{width: 100, height: 100}}
                       source={require('../assets/guardcorp_logo.png')}/>
                <Text className={'text-2xl text-white mt-4'}>Security Guard App</Text>
                <Text className={'text-white mt-4'}>Login to begin your shift</Text>
            </View>
            <View className="bg-white px-5 py-12 shadow-lg">
                {error && <View className="px-5 py-2 bg-red-400 rounded mb-3">
                    <Text className={'text-white'}>Login Failed!</Text>
                </View>}
                <Input
                    value={license}
                    onChangeText={(val) => setLicense(val)}
                    placeholder="Enter your license"
                />
                <CustomButton addStyle={'mt-3'} onPress={login}>
                    <Text className="text-center text-white">Verify License</Text>
                </CustomButton>
            </View>
        </View>
    );
}