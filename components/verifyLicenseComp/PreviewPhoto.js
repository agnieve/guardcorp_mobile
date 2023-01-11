import CustomButton from "../CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import {Image, ImageBackground, Modal, TouchableOpacity, View} from "react-native";
import {savePicture} from "../../utility/api/savePicture";
import {saveStorage} from "../../utility/asyncStorage";
import {useAtom} from "jotai";
import {picture} from "../../atom/user";


export default function PreviewPhoto(props){

    const { modalVisible, setModalVisible, capturedImage, navigation } = props;
    const [usePicture, setUsePicture] = useAtom(picture);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >

            <View className={'flex-1 justify-center'}>
                <View className={'absolute z-10 top-5 right-5 bg-white rounded-full p'}>
                    <TouchableOpacity onPress={()=> setModalVisible(false)}>
                        <MaterialIcons name={'close'} size={30} color={'#949494'}/>
                    </TouchableOpacity>
                </View>
                <View className={'absolute z-10 inset-x-0 bottom-5 '}>
                    <View className={'flex items-center'}>
                        <View className={'p-3 bg-white rounded-full'}>
                            <TouchableOpacity onPress={async ()=> {
                                const result = await savePicture(capturedImage['base64']);
                                await saveStorage('picture', result);
                                setUsePicture(result);
                                setModalVisible(false);
                                navigation.push('SiteInduction');
                            }}>
                                <MaterialIcons name={'save'} size={30} color={'#949494'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Image
                    source={{uri: capturedImage && capturedImage.uri}}
                    style={{
                        flex: 1,
                    }}
                />
            </View>
        </Modal>
    )
}