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
    const [refresh, setRefresh] = useState(0);

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

    let loc;
    useEffect(() => {

        (async () => {

            try{
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                loc = await Location.getCurrentPositionAsync({});
                setLocation(loc);

                console.log("log from getting location on async: ",loc);
            }catch(e){
                console.log(e);
            }

        })();
    }, [refresh]);


    return (
        <View className={'flex justify-center'}>
            {/*<Text className={'text-center'}>{location?.coords?.latitude}</Text>*/}
            {
                location.coords && <SiteLocationList modalVisible={modalVisible} setModalVisible={setModalVisible} coords={location?.coords}
                                                   navigation={navigation}/>
            }
            <Image className={'w-full h-72'}
                   source={{uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location?.coords?.latitude},${location?.coords?.longitude}&zoom=14&size=400x400&key=${GOOGLE_STATIC_API_KEY}`}}/>
            {
                location.coords ? <CustomButton addStyle={'mx-5 mt-10 py-4 bg-cyan-500'} onPress={() => setModalVisible(true)}>
                    <Text className={'text-white text-center'}>Confirm Location</Text>
                </CustomButton> : <>
                    <Text className={'text-center mt-10 mb-2'}>Could not get your Current Location</Text>
                    <CustomButton addStyle={'mx-5 py-4 bg-cyan-500'} onPress={() => setRefresh(prev => prev + 1)}>
                        <Text className={'text-white text-center'}>Refresh</Text>
                    </CustomButton>
                </>
            }
        </View>
    )
}