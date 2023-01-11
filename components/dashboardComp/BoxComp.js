import {Text, View} from "react-native";
import CustomBox from "./CustomBox";
import CustomButton from "../CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import {useState} from "react";
import ReportModal from "./ReportModal";
import PatrolModal from "./PatrolModal";
import CustomAlert from "../CustomAlert";
import InspectionModal from "./InspectionModal";
import EndShiftModal from "./EndShiftModal";

export default function BoxComp(props) {

    const [patrolStarted, setPatrolStarted] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [patrolModalVisible, setPatrolModalVisible] = useState(false);
    const [inspectionModalVisible, setInspectionModalVisible] = useState(false);
    const [endShiftModalVisible, setEndShiftModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const {user, site, event} = props;

    return (

        <View className={'flex flex-row justify-center items-center flex-wrap h-screen w-screen mt-2 overflow-hidden'}>

            <CustomAlert modalVisible={alertVisible} setModalVisible={setAlertVisible}>
                <Text>{alertContent}</Text>
                <View className={'flex items-end mt-3'}>
                    <CustomButton addStyle={'bg-white'} onPress={()=> setAlertVisible(false)}>
                        <Text>OK</Text>
                    </CustomButton>
                </View>
            </CustomAlert>

            <ReportModal modalVisible={reportModalVisible} setModalVisible={setReportModalVisible} name={user?.fullName}
                         site={site?.siteName} address={site?.address}/>
            <PatrolModal modalVisible={patrolModalVisible} setModalVisible={setPatrolModalVisible} name={user?.fullName}
                         site={site?.siteName} address={site?.address} setPatrolStarted={setPatrolStarted}/>
            <InspectionModal modalVisible={inspectionModalVisible} setModalVisible={setInspectionModalVisible} name={user?.fullName}
                         site={site?.siteName} address={site?.address}/>

            <EndShiftModal modalVisible={endShiftModalVisible} setModalVisible={setEndShiftModalVisible} name={user?.fullName}
                             site={site?.siteName} address={site?.address} event={event}/>

            <View className={'bg-[#475c6f] h-[21%] w-[46%] mr-1 mb-2'}>
                <CustomButton
                    addStyle={`h-full rounded-lg border border-white ${patrolStarted ? 'bg-cyan-700' : 'bg-cyan-500'}`}
                    onPress={() => {
                        if(patrolStarted){
                            setAlertContent("Patrol has already started");
                            setAlertVisible(true);
                        }
                        else{
                            setPatrolStarted(true);
                            setAlertContent("Patrol started");
                            setAlertVisible(true);
                        }
                    }}>
                    <View className={'flex justify-center items-center'}>
                        <Text className={'text-center text-base mb text-white'}>START PATROL</Text>
                        <MaterialIcons name={'play-circle-outline'} size={70} color={'#475c6f'}/>
                        {patrolStarted && <Text className={'text-white text-center text-xs'}>Patrol Started</Text>}
                    </View>
                </CustomButton>
            </View>
            <View className={'bg-[#475c6f] h-[21%] w-[46%] rounded-lg ml-1 mb-2'}>
                <CustomButton addStyle={'h-full border border-white bg-cyan-500 '} onPress={() => {
                    if(patrolStarted === false){
                        setAlertContent("Patrol has not yet started");
                        setAlertVisible(true);
                    }else{
                        setPatrolModalVisible(true);
                    }
                }}>
                    <View className={'flex justify-center items-center'}>
                        <Text className={'text-center text-base mb-2 text-white'}>STOP PATROL</Text>
                        <View
                            className={'w-14 h-14 rounded-full border-4 border-[#475c6f] flex items-center justify-center'}>
                            <View className={'bg-[#475c6f] h-6 w-6'}></View>
                        </View>
                    </View>
                </CustomButton>
            </View>
            <View className={'bg-[#475c6f] h-[21%] w-[46%] mr-1 mb-2'}>
                <CustomBox title={'REPORT'} icon={'article'} onPress={() => {
                    setReportModalVisible(true);
                }}/>
            </View>
            <View className={'bg-[#475c6f] h-[21%] w-[46%] ml-1 mb-2'}>
                <CustomBox title={'INSPECTION'} icon={'policy'} onPress={()=> setInspectionModalVisible(true)}/>
            </View>
            <View className={'bg-[#475c6f] h-[21%] w-[94%] mb-2'}>
                <CustomButton addStyle={'h-full rounded-2xl border border-red-500 bg-cyan-500'} onPress={()=> setEndShiftModalVisible(true)}>
                    <View className={'flex justify-center items-center'}>
                        <Text className={'text-center text-base mb text-white'}>END SHIFT</Text>
                        <MaterialIcons name={'highlight-off'} size={70} color={'red'}/>
                    </View>
                </CustomButton>
            </View>
        </View>
    )
}