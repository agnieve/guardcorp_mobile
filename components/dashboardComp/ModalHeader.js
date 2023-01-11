import {Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import CustomButton from "../CustomButton";
import {savePicture} from "../../utility/api/savePicture";
import {saveStorage} from "../../utility/asyncStorage";

export default function ModalHeader(props) {

    const now = new Date().toLocaleString();
    const {name, site, address, title, setModalVisible, startShift} = props;

    return (
        <View>
            <View className={'bg-cyan-500 py-5 px-5 shadow-lg'} style={{
                elevation: 4, shadowColor: 'black',
                shadowOpacity: 0.25,
                shadowOffset: {width: 1, height: 2},
                shadowRadius: 8
            }}>
                <View className={'flex flex-row justify-between items-center'}>
                    <Text className={'text-white text-lg'}>{title}</Text>

                    <TouchableOpacity onPress={async () => {
                        setModalVisible(false);
                    }}>
                        <MaterialIcons name={'close'} size={30} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View className={'p-5'}>

                <View className={'flex flex-row items-center gap-2'}>
                    <MaterialIcons name={'person-outline'} size={28} color={'#475c6f'}/>
                    <Text className={'text-gray-500'}>{name}</Text>
                </View>
                <View className={'flex flex-row items-center gap-2'}>
                    <MaterialIcons name={'water-damage'} size={28} color={'#475c6f'}/>
                    <Text className={'text-gray-500'}>{site}</Text>
                </View>
                <View className={'flex flex-row items-center gap-2'}>
                    <MaterialCommunityIcons name={'calendar-month'} size={28} color={'#475c6f'}/>
                    <Text className={'text-gray-500'}>{now}</Text>
                </View>
                <View className={'flex flex-row items-center gap-2'}>
                    <MaterialCommunityIcons name={'map-marker-outline'} size={28} color={'#475c6f'}/>
                    <Text className={'text-gray-500'}>{address}</Text>
                </View>
                {
                    startShift &&
                    <>
                        <View className={'flex flex-row items-center gap-2'}>
                            <MaterialIcons name={'access-time'} size={28} color={'#475c6f'}/>
                            <Text
                                className={'text-gray-500'}>{new Date(startShift).toLocaleDateString()} ({new Date(startShift).toLocaleTimeString()})</Text>
                        </View>
                        <View className={'flex flex-row items-center gap-2'}>
                            <MaterialIcons name={'hourglass-bottom'} size={28} color={'#475c6f'}/>
                            <Text className={'text-gray-500'}>{new Date().toLocaleDateString()} ({new Date().toLocaleTimeString()})</Text>
                        </View>
                    </>
                }
            </View>
        </View>
    )
}