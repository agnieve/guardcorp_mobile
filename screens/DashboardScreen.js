import {Text, View} from "react-native";
import {useAtom} from "jotai";
import {event, site, user} from "../atom/user";
import PagerView from "react-native-pager-view";
import BoxComp from "../components/dashboardComp/BoxComp";
import ActivityLogsComp from "../components/dashboardComp/ActivityLogsComp";
import ReportLogsComp from "../components/dashboardComp/ReportLogsComp";
import {useRef, useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";


export default function DashboardScreen() {

    const [useUser, setUserUser] = useAtom(user);
    const [useSite, setUseSite] = useAtom(site);
    const [useEvent, setUseEvent] = useAtom(event);
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <View className="flex-1 flex-col justify-center bg-[#475c6f]">
            <PagerView className={'flex-1'}
                       initialPage={0}
                       onPageSelected={(PageSelectedEvent) => {
                           setCurrentPage(PageSelectedEvent.nativeEvent.position)
                       }}>
                <View className={'flex-1'} key="1">
                    <BoxComp user={useUser} site={useSite} event={useEvent}/>
                </View>
                <View className={'flex-1'} key="2">
                    <ActivityLogsComp/>
                </View>
                <View className={'flex-1'} key="3">
                    <ReportLogsComp/>
                </View>
            </PagerView>
            <View className={'flex-2 mb-2 flex-row justify-center items-center w-full space-x-2'}>
                <MaterialIcons name={`${currentPage === 0 ? 'lens' : 'panorama-fisheye'}`} size={13} color={'#fff'}/>
                <MaterialIcons name={`${currentPage === 1 ? 'lens' : 'panorama-fisheye'}`} size={13} color={'#fff'}/>
                <MaterialIcons name={`${currentPage === 2 ? 'lens' : 'panorama-fisheye'}`} size={13} color={'#fff'}/>
            </View>
        </View>
    )
}