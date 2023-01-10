import {Image, Modal, Text, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import CustomButton from "../CustomButton";

export default function VerifyModal(props){

    const {modalVisible, setModalVisible, data, userVerified} = props;

    return(
        <Modal
            animationType="slide"
            // transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View className={'items-end mb-10'}>
                <CustomButton addStyle={'bg-white'} onPress={()=> {
                    setModalVisible(false);
                }}>
                    <MaterialIcons name={'close'} size={24} color={'#ccc'}/>
                </CustomButton>
            </View>
            <View className={'flex-1 justify-center'}>

                <View className={'flex items-center'}>
                    <Image source={{uri: data.profilePicture}} className={'w-24 h-24 rounded-full'} />
                    <Text className={'text-lg'} >{data.fullName}</Text>
                    <Text className={'text-lg'} >{data.email}</Text>
                    <Text className={'text-lg'} >{data.mobilePhone}</Text>
                </View>
                <View className={'flex flex-row justify-center space-x-3 mt-5'}>
                    <CustomButton addStyle={'mr-2 bg-green-700'} onPress={userVerified}>
                        <Text className="text-white">It's Me</Text>
                    </CustomButton>
                    <CustomButton addStyle={'bg-red-500'} onPress={()=> {
                        setModalVisible(false);
                    }}>
                        <Text className="text-white">Not Me</Text>
                    </CustomButton>
                </View>

            </View>
        </Modal>
    )
}