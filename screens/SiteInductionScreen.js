import {Image, Text, TouchableOpacity, View} from "react-native";
import {useAtom} from "jotai";
import {event, picture, site} from "../atom/user";
import CustomButton from "../components/CustomButton";
import {savePicture} from "../utility/api/savePicture";
import {getStorage, saveStorage} from "../utility/asyncStorage";
import {MaterialIcons} from "@expo/vector-icons";
import {useEffect} from "react";
import {saveEvent} from "../utility/api/saveEvent";


export default function SiteInductionScreen(props){

    const { navigation } = props;

    const [useSite, setUseSite] = useAtom(site);
    const [usePicture, setUsePicture] = useAtom(picture);
    const [useEvent, setUseEvent] = useAtom(event);

    async function addEvent(){
        navigation.push('Dashboard');
        const user = await getStorage('user');
        const site = await getStorage('site');
        const picture = await getStorage('picture');

        const newEvent = {
            user: user,
            picture: picture,
            site: site,
            date: new Date(),
            end: ""
        };

        const result = await saveEvent(newEvent);
        await saveStorage('event', result);


    }

    useEffect(()=> {
        (async () => {
            const result3 = await getStorage('event');
            if (result3) {
                setUseEvent(result3);
                navigation.push('Dashboard');
                return;
            }
        })();
    },[]);

    useEffect(() => {
        (async () => {
            const site = await getStorage('site');
            const picture = await getStorage('picture');

            setUseSite(site);
            setUsePicture(picture);
        })();
    }, [usePicture]);


    return(
        <View className={'flex-1'}>
            <View className={'px-5'}>
                <Text className={'font-bold mt-5'}>I confirm that:</Text>
                <Text className={'mb-5'}>{useSite?.complianceInformation}</Text>
                <Text>Proof of License</Text>
                {
                    usePicture?.data ? <Image source={{uri: usePicture?.data?.display_url}} style={{width: '100%', height:300}} />
                        : <View>
                        <Text>Loading . . .</Text>
                        </View>
                }
            </View>


           <View className={'absolute inset-x-0 bottom-0'}>
               <View className={'flex items-center bg-cyan-700 py-5'}>
                   <TouchableOpacity onPress={addEvent}>
                       <Text className={'text-white'}>AGREE & START SHIFT</Text>
                   </TouchableOpacity>
               </View>
           </View>
        </View>
    )
}