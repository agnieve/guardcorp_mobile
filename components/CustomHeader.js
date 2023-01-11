import {Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import CustomButton from "./CustomButton";


export default function CustomHeader(props) {

    const nowDate = new Date().toLocaleDateString();
    const nowTime = new Date().toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    const {userData, siteData, icon, title} = props;

    return (
        <View className={'py-4'}>

            <View className={'flex-1 flex-row justify-between'}>
                <View>
                    <Text className="text-white mt-3">{nowDate} ({nowTime})</Text>
                    <Text className="text-white">{userData.fullName}</Text>
                    {
                        siteData &&
                        <Text className={'text-white mb-3'}>{siteData.siteName}</Text>
                    }
                    <Text className={'text-lg text-white'}>{title}</Text>
                </View>

                <CustomButton addStyle={'bg-[#475c6f]'}>
                    <MaterialIcons name={icon} size={80} color={'#3c4d5d'}/>
                </CustomButton>
            </View>
        </View>
    )
}