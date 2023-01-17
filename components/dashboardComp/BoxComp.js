import {Text, View} from "react-native";
import CustomBox from "./CustomBox";
import CustomButton from "../CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import ReportModal from "./ReportModal";
import PatrolModal from "./PatrolModal";
import CustomAlert from "../CustomAlert";
import InspectionModal from "./InspectionModal";
import EndShiftModal from "./EndShiftModal";
import {addPatrol} from "../../utility/api/patrol";
import {removeStorage} from "../../utility/asyncStorage";
import {addInspection} from "../../utility/api/inspection";
import {addReport} from "../../utility/api/report";
import {downloadEvent, shiftOut} from "../../utility/api/saveEvent";

export default function BoxComp(props) {

    const [patrolStarted, setPatrolStarted] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [patrolModalVisible, setPatrolModalVisible] = useState(false);
    const [inspectionModalVisible, setInspectionModalVisible] = useState(false);
    const [endShiftModalVisible, setEndShiftModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const {user, site, myEvent, setNewAction, setNewAction2} = props;

    async function addReportHandler(type, notes) {

        await addReport({
            type: type, notes: notes, date: new Date(), eventId: myEvent?._id
        });

        setNewAction(prev => prev + 1);

        return true;
    }

    async function shiftOutHandler(reason) {
        await shiftOut({
            eventId:myEvent?._id, reason:reason, date: new Date()
        });

        await downloadEvent(myEvent?._id);

        setNewAction(prev => prev + 1);

        return true;
    }

    async function addInspectionHandler(type, notes) {
        await addInspection({
            type: type, notes: notes, date: new Date(), eventId: myEvent?._id
        });

        setNewAction2(prev => prev + 1);

        return true;
    }

    async function addPatrolHandler(status, notes, type) {

        await addPatrol({
            dateTime: new Date(), eventId: myEvent?._id, notes: notes, type: type, status: status
        });

        setNewAction2(prev => prev + 1);

        return true;
    }

    return (

        <View className={'flex flex-row justify-center items-center flex-wrap h-screen w-screen mt-2 overflow-hidden'}>

            <CustomAlert modalVisible={alertVisible} setModalVisible={setAlertVisible}>
                <Text>{alertContent}</Text>
                <View className={'flex items-end mt-3'}>
                    <CustomButton addStyle={'bg-white'} onPress={() => setAlertVisible(false)}>
                        <Text>OK</Text>
                    </CustomButton>
                </View>
            </CustomAlert>

            <ReportModal modalVisible={reportModalVisible} setModalVisible={setReportModalVisible} name={user?.fullName}
                         site={site?.siteName} address={site?.address} addReport={addReportHandler}/>
            <PatrolModal modalVisible={patrolModalVisible} setModalVisible={setPatrolModalVisible} name={user?.fullName}
                         site={site?.siteName} address={site?.address} setPatrolStarted={setPatrolStarted}
                         addPatrolHandler={addPatrolHandler}/>
            <InspectionModal modalVisible={inspectionModalVisible} setModalVisible={setInspectionModalVisible}
                             name={user?.fullName}
                             site={site?.siteName} address={site?.address} addInspection={addInspectionHandler}/>

            <EndShiftModal modalVisible={endShiftModalVisible} setModalVisible={setEndShiftModalVisible}
                           name={user?.fullName}
                           mySite={site?.siteName} address={site?.address} shiftOutHandler={shiftOutHandler} myEvent={myEvent}/>

            <View className={'bg-[#475c6f] h-[21%] w-[46%] mr-1 mb-2'}>
                <CustomButton
                    addStyle={`h-full rounded-lg flex justify-center items-center border border-white ${patrolStarted ? 'bg-cyan-700' : 'bg-cyan-500'}`}
                    onPress={async () => {
                        if (patrolStarted) {
                            setAlertContent("Patrol has already started");
                            setAlertVisible(true);
                        } else {
                            setPatrolStarted(true);
                            setAlertContent("Patrol started");
                            setAlertVisible(true);
                            await addPatrolHandler("START", "", "");
                        }


                    }}>
                    <>
                        <Text className={'text-center text-base mb text-white absolute z-10 top-2'}>START PATROL</Text>
                        <MaterialIcons name={'play-circle-outline'} size={70} color={'#475c6f'}/>
                        {patrolStarted && <Text className={'text-white text-center text-xs absolute z-10 bottom-3'}>Patrol Started</Text>}
                    </>
                </CustomButton>
            </View>
            <View className={'bg-[#475c6f] h-[21%] w-[46%] rounded-lg ml-1 mb-2'}>
                <CustomButton addStyle={'h-full flex justify-center items-center border border-white bg-cyan-500 '} onPress={() => {
                    if (patrolStarted === false) {
                        setAlertContent("Patrol has not yet started");
                        setAlertVisible(true);
                    } else {
                        setPatrolModalVisible(true);
                    }
                }}>
                    <>
                        <Text className={'text-center text-base mb-2 text-white absolute z-10 top-2'}>STOP PATROL</Text>
                        <View
                            className={'w-14 h-14 rounded-full border-4 border-[#475c6f] flex items-center justify-center'}>
                            <View className={'bg-[#475c6f] h-6 w-6'}></View>
                        </View>
                    </>
                </CustomButton>
            </View>
            <View className={'bg-[#475c6f] h-[21%] w-[46%] mr-1 mb-2'}>
                <CustomBox title={'REPORT'} icon={'article'} onPress={() => {
                    setReportModalVisible(true);
                }}/>
            </View>
            <View className={'bg-[#475c6f] h-[21%] w-[46%] ml-1 mb-2'}>
                <CustomBox title={'INSPECTION'} icon={'policy'} onPress={() => setInspectionModalVisible(true)}/>
            </View>
            <View className={'bg-[#475c6f] h-[21%] w-[94%] mb-2'}>
                <CustomButton addStyle={'h-full flex justify-center items-center rounded-2xl border border-red-500 bg-cyan-500'}
                              onPress={() => {
                                  setEndShiftModalVisible(true);
                              }}>
                    <>
                        <Text className={'text-center text-base mb text-white absolute z-10 top-2'}>END SHIFT</Text>
                        <MaterialIcons name={'highlight-off'} size={70} color={'red'}/>
                    </>
                </CustomButton>
            </View>
        </View>
    )
}