import {Button, Text, TouchableOpacity, View} from "react-native";
import {Camera, CameraType} from "expo-camera";
import {useEffect, useState} from "react";
import CustomButton from "../components/CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import PreviewPhoto from "../components/verifyLicenseComp/PreviewPhoto";
import {getStorage} from "../utility/asyncStorage";
import {useAtom} from "jotai";
import {picture} from "../atom/user";

export default function VerifyLicenseScreen(props){

    const { navigation } = props;
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    let camera;

    const [usePicture, setUsePicture] = useAtom(picture);

    useEffect(()=> {
        (async () => {
            const result = await getStorage('picture');
            if (result) {
                setUsePicture(result);
                navigation.push('SiteInduction');
                return;
            }
        })();
    },[]);


    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View className={'flex-1 justify-center items-center m-10'}>
                <Text className={'text-center mb-2'}>We need your permission to show the camera</Text>
                <CustomButton onPress={requestPermission}><Text className={'text-white'}>Grant Permission</Text></CustomButton>
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function takePicture() {
        if (camera) {
            const options = {quality: 1, base64: true};
            const data = await camera.takePictureAsync(options);
            setPreviewVisible(true)
            setCapturedImage(data)
        }
    }

    return(
        <View className={'flex-1 bg-slate-300'}>
            <PreviewPhoto navigation={navigation} capturedImage={capturedImage} setModalVisible={setPreviewVisible} modalVisible={previewVisible} />
            <Camera
                className={'flex-1'}
                type={type}
                ref={(ref) => {
                    camera = ref;
                }}
            >
                <View className={'absolute z-5 bottom-20 right-20'}>
                    <TouchableOpacity onPress={toggleCameraType}>
                        <MaterialIcons name={'flip-camera-android'} size={50} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
                <View className={'absolute z-5 bottom-20 left-20'}>
                    <TouchableOpacity onPress={takePicture}>
                        <MaterialIcons name={'camera'} size={50} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
}