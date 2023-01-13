import {Text, View} from "react-native";
import {useAtom} from "jotai";
import {event, site, user} from "../atom/user";
import PagerView from "react-native-pager-view";
import BoxComp from "../components/dashboardComp/BoxComp";
import ActivityLogsComp from "../components/dashboardComp/ActivityLogsComp";
import ReportLogsComp from "../components/dashboardComp/ReportLogsComp";
import {useEffect, useRef, useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {getStorage} from "../utility/asyncStorage";
import {getReports} from "../utility/api/report";
import {getPatrols} from "../utility/api/patrol";
import {getInspections} from "../utility/api/inspection";


export default function DashboardScreen(props) {

    const [useUser, setUserUser] = useAtom(user);
    const [useSite, setUseSite] = useAtom(site);
    const [useEvent, setUseEvent] = useAtom(event);
    const [currentPage, setCurrentPage] = useState(0);
    const [reports, setReports] = useState([]);
    const [newAction, setNewAction] = useState(0);
    const [newAction2, setNewAction2] = useState(0);
    const [patrols, setPatrols] = useState([]);
    const [inspections, setInspections] = useState([]);

    const {navigation} = props;

    // useEffect(() => {
    //     (async () => {
    //         const result2 = await getStorage('event');
    //         if (result2) {
    //             setUseEvent(result2);
    //         }
    //     })();
    // }, []);

    useEffect(() => {
        (async () => {
            const result = await getStorage('user');
            if (!result) {
                setUserUser(result);
                navigation.push('Login');
                return;
            }
        })();
    }, []);

    useEffect(() => {
         getReports(useEvent?._id).then((data) => {
             setReports(data);
         });

    }, [newAction]);

    useEffect(() => {

        getPatrols(useEvent?._id).then((data) => {
            setPatrols(data);
        });

        getInspections(useEvent?._id).then((data) => {
            setInspections(data);
        });
    }, [newAction2]);



    return (
        <View className="flex-1 flex-col justify-center bg-[#475c6f]">
            <PagerView className={'flex-1'}
                       initialPage={0}
                       onPageSelected={(PageSelectedEvent) => {
                           setCurrentPage(PageSelectedEvent.nativeEvent.position)
                       }}>
                <View className={'flex-1'} key="1">
                        <BoxComp user={useUser} site={useSite} myEvent={useEvent} setNewAction={setNewAction} setNewAction2={setNewAction2}/>
                </View>
                <View className={'flex-1'} key="2">
                    <ActivityLogsComp setNewAction2={setNewAction2} data={[...patrols, ...inspections]}/>
                </View>
                <View className={'flex-1'} key="3">
                    <ReportLogsComp data={reports}/>
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