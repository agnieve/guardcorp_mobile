import ModalHeader from "./ModalHeader";
import {Modal, Text, TextInput, View} from "react-native";
import CustomButton from "../CustomButton";
import {useState} from "react";

export default function InspectionModal(props) {

    const {modalVisible, setModalVisible, name, site, address, addInspection} = props;
    const [inspectionType, setInspectionType] = useState("");
    const [notes, setNotes] = useState("");

    return (
        <Modal
            animationType="slide"
            // transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View className={'shadow-lg p-0 m-0 bg-white'} style={{
                elevation: 3, shadowColor: 'black',
                shadowOpacity: 0.25,
                shadowOffset: {width: 1, height: 3},
                shadowRadius: 10
            }}>
                <ModalHeader setModalVisible={setModalVisible} title={'Inspection'} name={name} site={site}
                             address={address}/>
            </View>

            <View className={'flex flex-row justify-between mx-4 mt-5 space-x-2'}>
                <View>
                    <CustomButton addStyle={`${inspectionType==='Carpark' ? 'bg-cyan-800': 'bg-cyan-500'}`} onPress={()=> setInspectionType("Carpark")}>
                        <Text className={'text-white'}>Carpark</Text>
                    </CustomButton>
                </View>
                <View>
                    <CustomButton addStyle={`${inspectionType==='Building' ? 'bg-cyan-800': 'bg-cyan-500'}`} onPress={()=> setInspectionType("Building")}>
                        <Text className={'text-white'}>Building</Text>
                    </CustomButton>
                </View>
                <View>
                    <CustomButton addStyle={`${inspectionType==='Check Cameras' ? 'bg-cyan-800': 'bg-cyan-500'}`} onPress={()=> setInspectionType("Check Cameras")}>
                        <Text className={'text-white'}>Check Cameras</Text>
                    </CustomButton>
                </View>
            </View>
            <View className={'px-7 mt-5'}>
                <Text>Inspection Type: {inspectionType}</Text>
            </View>
            <View className={'mx-7 mt-3'}>
                    <TextInput
                        className={'px-5 py-3 bg-slate-100'}
                        textAlignVertical={'top'}
                        multiline
                        numberOfLines={10}
                        placeholder={'Comments or Notes'}
                        onChangeText={text => setNotes(text)}
                        value={notes}
                        style={{
                            elevation: 2, shadowColor: 'black',
                            shadowOpacity: 0.25,
                            shadowOffset: {width: 1, height: 2},
                            shadowRadius: 8
                        }}
                    />
            </View>
            <View className={'px-7 mt-5'}>
                <CustomButton addStyle={'bg-cyan-500'} onPress={async ()=> {
                    await addInspection(inspectionType, notes);
                    setInspectionType("");
                    setNotes("");
                    setModalVisible(false);
                }}>
                    <Text className={'text-white text-center text-lg'}>Save Inspection</Text>
                </CustomButton>
            </View>
            <View className={'absolute z-10 inset-x-0 bottom-5 py bg-cyan-500'}>
                {/*<View className={'flex flex-row justify-between px-5'}>*/}
                {/*    <CustomButton addStyle={'bg-cyan-500'}>*/}
                {/*        <Text className={'text-white'}>CANCEL</Text>*/}
                {/*    </CustomButton>*/}
                {/*    <CustomButton addStyle={'bg-cyan-500'}>*/}
                {/*        <Text className={'text-white'}>CONFIRM</Text>*/}
                {/*    </CustomButton>*/}
                {/*</View>*/}
            </View>
        </Modal>
    )
}