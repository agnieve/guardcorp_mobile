import {Text, View} from "react-native";
import {useAtom} from "jotai";
import {user} from "../atom/user";
import {FlashList} from "@shopify/flash-list";
import {MaterialIcons} from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import CustomBox from "../components/dashboardComp/CustomBox";


export default function DashboardScreen() {

    const [useUser, setUserUser] = useAtom(user);

    return (
        <View className="flex-1 flex-row justify-center bg-[#475c6f]">
            <View className={'flex flex-row flex-wrap h-screen w-screen gap-2 m-2 overflow-hidden'}>
                <View className={'bg-[#475c6f] h-[21%] w-[46%]'}>
                    <CustomBox title={'START PATROL'} icon={'play-circle-outline'} />
                </View>
                <View className={'bg-[#475c6f] h-[21%] w-[46%]'}>
                    <CustomButton addStyle={'h-full rounded-2xl border border-white bg-cyan-500'}>
                        <View className={'flex justify-center items-center'}>
                            <Text className={'text-center text-base mb-2 text-white'}>STOP PATROL</Text>
                            <View className={'w-14 h-14 rounded-full border-4 border-[#475c6f] flex items-center justify-center'}>
                                <View className={'bg-[#475c6f] h-6 w-6'}></View>
                            </View>
                        </View>
                    </CustomButton>
                </View>
                <View className={'bg-[#475c6f] h-[21%] w-[46%]'}>
                    <CustomBox title={'REPORT'} icon={'article'} />
                </View>
                <View className={'bg-[#475c6f] h-[21%] w-[46%]'}>
                    <CustomBox title={'INSPECTION'} icon={'policy'} />
                </View>
                <View className={'bg-[#475c6f] h-[21%] w-[94%]'}>
                    <CustomBox title={'END SHIFT'} icon={'highlight-off'} />
                </View>
                <View className={'flex flex-row justify-center items-center w-full'}>
                    <MaterialIcons name={'panorama-fisheye'} size={15} color={'#fff'}/>
                    <MaterialIcons name={'panorama-fisheye'} size={15} color={'#fff'}/>
                    <MaterialIcons name={'panorama-fisheye'} size={15} color={'#fff'}/>
                </View>
            </View>
        </View>
    )
}