import {Image, Text, View} from "react-native";
import {GOOGLE_STATIC_API_KEY} from "../constants/env";
import CustomButton from "../components/CustomButton";
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import SiteLocationList from "../components/confirmLocationComp/SiteLocationList";
import {useAtom} from "jotai";
import {event, picture, site} from "../atom/user";
import {getStorage} from "../utility/asyncStorage";

export default function ConfirmLocationScreen(props) {

    const {navigation} = props;
    const [errorMsg, setErrorMsg] = useState("");
    const [location, setLocation] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const [useSite, setUseSite] = useAtom(site);
    const [usePicture, setUsePicture] = useAtom(picture);
    const [useEvent, setUseEvent] = useAtom(event);

    useEffect(() => {
        (async () => {
            const result3 = await getStorage('event');
            if (result3) {
                setUseEvent(result3);
                const result2 = await getStorage('picture');
                setUsePicture(result2);
                const result = await getStorage('site');
                setUseSite(result);
                navigation.push('Dashboard');
                return;
            }

            const result2 = await getStorage('picture');
            if (result2) {
                setUsePicture(result2);
                setUseSite(result);
                navigation.push('SiteInduction');
                return;
            }

            const result = await getStorage('site');
            if (result) {
                setUseSite(result);
                navigation.push('VerifyLicense');
                return;
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            console.log('my location', location);
        })();
    }, []);


    return (
        <View className={'flex justify-center'}>
            <SiteLocationList modalVisible={modalVisible} setModalVisible={setModalVisible} coords={location?.coords}
                              navigation={navigation}/>
            <Image className={'w-full h-72'}
                   source={{uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location?.coords?.latitude},${location?.coords?.longitude}&zoom=14&size=400x400&key=${GOOGLE_STATIC_API_KEY}`}}/>
            <CustomButton addStyle={'mx-5 mt-10 py-4'} onPress={() => setModalVisible(true)}>
                <Text className={'text-white text-center'}>Confirm Location</Text>
            </CustomButton>
        </View>
    )
}