import {Image, Text, View} from "react-native";
import {GOOGLE_STATIC_API_KEY} from "../constants/env";
import CustomButton from "../components/CustomButton";
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import SiteLocationList from "../components/confirmLocationComp/SiteLocationList";
import {useAtom} from "jotai";
import {event, picture, site} from "../atom/user";
import {getStorage} from "../utility/asyncStorage";
import {getNearSites} from "../utility/api/site";

export default function ConfirmLocationScreen(props) {

    const {navigation} = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState("");

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

            try{
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                const loc = await Location.getCurrentPositionAsync({});

                setLocation(loc.coords);

            }catch(e){
            }

        })();
    }, []);

    return (
        <View className={'flex justify-center'}>
            {/*<Text className={'text-center'}>{location?.coords?.latitude}</Text>*/}
            <SiteLocationList modalVisible={modalVisible} setModalVisible={setModalVisible}
                              navigation={navigation} refresh={refresh} setRefresh={setRefresh}/>
            {
                location ? <Image className={'w-full h-72'}
                                  source={{uri:
                                      `https://maps.googleapis.com/maps/api/staticmap?size=512x512&zoom=16&maptype=roadmap&markers=size:mid%7Ccolor:red%7C${location?.latitude}, ${location.longitude}&key=${GOOGLE_STATIC_API_KEY}`}} />
                                          // `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x400&key=${GOOGLE_STATIC_API_KEY}`}}

                    : <View>
                    <Text className={'text-center'}>Loading . . . </Text>
                    </View>
            }
            <CustomButton addStyle={'mx-5 mt-10 py-4 bg-cyan-500'} onPress={() => {
                setModalVisible(true)
                setRefresh(prev => prev + 1)
            }}>
                <Text className={'text-white text-center'}>Confirm Location</Text>
            </CustomButton>
        </View>
    )
}