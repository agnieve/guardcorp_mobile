import {Button, Text, TouchableOpacity, View} from "react-native";
import {Camera, CameraType} from "expo-camera";
import {useEffect, useRef, useState} from "react";
import CustomButton from "../components/CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import PreviewPhoto from "../components/verifyLicenseComp/PreviewPhoto";
import {getStorage, saveStorage} from "../utility/asyncStorage";
import {useAtom} from "jotai";
import {picture} from "../atom/user";
import {savePicture} from "../utility/api/savePicture";

export default function VerifyLicenseScreen(props) {

    const {navigation} = props;
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    const camera = useRef();

    const [usePicture, setUsePicture] = useAtom(picture);

    // useEffect(() => {

        // (async () => {
        //     const result = await getStorage('picture');
        //     if (result) {
        //         setUsePicture(result);
        //         navigation.push('SiteInduction');
        //         return;
        //     }
        // })();
    // }, []);


    if (!permission) {
        // Camera permissions are still loading
        return <View/>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View className={'flex-1 justify-center items-center m-10'}>
                <Text className={'text-center mb-2'}>We need your permission to show the camera</Text>
                <CustomButton onPress={requestPermission}><Text className={'text-white'}>Grant
                    Permission</Text></CustomButton>
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function takePicture() {

        if (camera) {
            const options = {quality: 1, base64: true};
            const data = await camera.current.takePictureAsync(options);

            setCapturedImage(data);
            camera.current.pausePreview();

        }
    }

    return (
        <View className={'flex-1'}>
            <Camera
                className={'flex-1'}
                type={type}
                ref={camera}
            >
                {
                    capturedImage !== null ?
                        <>

                            <View className={'absolute z-5 bottom-20 right-20'}>
                                <TouchableOpacity onPress={() => {
                                    setCapturedImage(null);
                                    camera.current.resumePreview()
                                }
                                }>
                                    <MaterialIcons name={'close'} size={50} color={'#fff'}/>
                                </TouchableOpacity>
                            </View>
                            <View className={'absolute z-5 bottom-20 left-20'}>
                                <TouchableOpacity onPress={async () => {

                                    setUsePicture(result);
                                    navigation.push('SiteInduction');
                                    const result = await savePicture(capturedImage['base64']);
                                    await saveStorage('picture', result);
                                }}>
                                    <MaterialIcons name={'save'} size={50} color={'#fff'}/>
                                </TouchableOpacity>
                            </View>
                        </>
                        : <>
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
                        </>
                }
            </Camera>
        </View>
    )
}