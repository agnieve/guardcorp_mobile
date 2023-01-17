import CustomButton from "../CustomButton";
import {Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

export default function CustomBox(props){

    const {title, icon, onPress} = props;

    return(
        <CustomButton addStyle={'h-full flex justify-center items-center rounded-lg border border-white bg-cyan-500'} onPress={onPress}>
            <>
                <Text className={'text-center text-base mb text-white absolute z-10 top-2'}>{title}</Text>
                <MaterialIcons name={icon} size={70} color={'#475c6f'}/>
            </>
        </CustomButton>
    );
}