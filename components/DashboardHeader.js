import {Image, Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import CustomButton from "./CustomButton";


export default function DashboardHeader(props) {

    const nowDate = new Date().toLocaleDateString();
    const nowTime = new Date().toLocaleTimeString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const {userData, siteData, icon, title} = props;

    return (
        <View className={'py-4 mx-2 shadow-lg'} style={{
            elevation: 10, shadowColor: 'black',
            shadowOpacity: 0.50,
            shadowOffset: {width: 1, height: 2},
            shadowRadius: 10
        }}>
            <View className="">
                <Image style={{width: 95, height: 95}}
                       source={require('../assets/guardcorp_logo.png')}/>
                <Text className={'text-sm text-white mt-4'}>Site: {siteData?.siteName}</Text>
                <Text className={'text-xs text-white mb-3'}>Address: {siteData?.address}</Text>
            </View>
           <View className={'absolute z-5 top-5 right-5'}>
               <Text className={'text-white text-xs'}>Date: {nowDate}</Text>
               <Text className={'text-white text-xs'}>Time: {nowTime}</Text>
           </View>
        </View>
    )
}