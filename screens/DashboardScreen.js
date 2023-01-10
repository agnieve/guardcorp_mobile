import {Text, View} from "react-native";
import CustomButton from "../components/CustomButton";
import {removeStorage} from "../utility/asyncStorage";
import {useAtom} from "jotai";
import {user} from "../atom/user";


export default function DashboardScreen(){

    const [useUser, setUserUser] = useAtom(user);
    return(
        <View className="flex-1 justify-center bg-slate-100">
            <Text className={'text-center'}>Dashboard</Text>
            <View className="px-10">
                <CustomButton onPress={async ()=> {
                    await removeStorage('user');
                    setUserUser({});
                }}>
                    <Text className="text-center text-white">Logout</Text>
                </CustomButton>
            </View>
        </View>
    )
}