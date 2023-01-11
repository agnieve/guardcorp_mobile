import CustomButton from "../CustomButton";
import {Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

export default function CustomBox(props){

    const {title, icon, onPress} = props;

    return(
        <CustomButton addStyle={'h-full rounded-lg border border-white bg-cyan-500'} onPress={onPress}>
            <View className={'flex justify-center items-center'}>
                <Text className={'text-center text-base mb text-white'}>{title}</Text>
                <MaterialIcons name={icon} size={70} color={'#475c6f'}/>
            </View>
        </CustomButton>
    );
}