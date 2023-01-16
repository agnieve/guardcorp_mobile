import {Modal, Text, View} from "react-native";
import CustomButton from "../CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import {FlashList} from "@shopify/flash-list";
import {useEffect, useState} from "react";
import {getNearSites} from '../../utility/api/site';
import CustomAlert from "../CustomAlert";
import {saveStorage} from "../../utility/asyncStorage";
import {site} from "../../atom/user";
import {useAtom} from "jotai";
import {getDistanceBetweenPoints} from "../../utility/distance";

export default function SiteLocationList(props) {


    const {modalVisible, setModalVisible, coords, navigation} = props;
    const [visible, setVisible] = useState(false);
    const [nearSites, setNearSites] = useState([]);
    const [useSite, setUseSite] = useAtom(site);

    useEffect(() => {

        console.log("coords from site location list: ",coords);

        getNearSites(coords).then((data) => {
            setNearSites(data);
        });
    }, []);

    return (
        <>
            <CustomAlert modalVisible={visible} setModalVisible={setVisible}>
                <Text>You cannot enter the Site, your distance is 50 meters away</Text>
                <View className={'flex items-end'}>
                    <CustomButton addStyle={'bg-white'} onPress={()=> setVisible(false)}>
                        <Text>OK</Text>
                    </CustomButton>
                </View>
            </CustomAlert>

            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >

                <View className={'items-end mb-10'}>
                    <CustomButton addStyle={'bg-white'} onPress={() => {
                        setModalVisible(false);
                    }}>
                        <MaterialIcons name={'close'} size={24} color={'#ccc'}/>
                    </CustomButton>
                </View>
                <View className={'flex-1 justify-center'}>
                    <Text className="text-lg text-center">Select Site</Text>
                    <Text className={'mx-7'}>My Latitude: {coords.latitude}</Text>
                    <Text className={'mx-7 mb-3'}>My Latitude: {coords.longitude}</Text>

                    <FlashList
                        data={nearSites}
                        renderItem={({item}) => {

                            let result = getDistanceBetweenPoints(item.latitude, item.longitude, coords?.latitude, coords?.longitude);

                            return(
                                <CustomButton onPress={async () => {


                                    if (result > 50) {
                                        setVisible(true);
                                    }else{
                                        setUseSite(item);
                                        setModalVisible(false);
                                        await saveStorage('site', item);

                                        navigation.push("VerifyLicense");
                                    }
                                }
                                } addStyle={'bg-white py-2'}>
                                    <View className={'bg-slate-100 px-5 py-3 mx-3 rounded-lg'}>
                                        <Text className={'text-base font-bold'}>{item.siteName}</Text>
                                        <Text className={'mb-3'}>{item.address}</Text>
                                        <Text>Distance From Site: {parseInt(result).toLocaleString('en-US')} meters</Text>
                                    </View>
                                </CustomButton>
                            )
                        }}
                        estimatedItemSize={50}
                    />
                </View>
            </Modal>
        </>
    )
}