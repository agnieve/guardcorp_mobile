import ModalHeader from "./ModalHeader";
import {Modal, Text, TextInput, View} from "react-native";
import CustomButton from "../CustomButton";
import {useState} from "react";

export default function PatrolModal(props) {

    const {modalVisible, setModalVisible, name, site, address, setPatrolStarted, addPatrolHandler} = props;
    const [patrolType, setPatrolType] = useState("");
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
                <ModalHeader setModalVisible={setModalVisible} title={'End Patrol'} name={name} site={site}
                             address={address}/>
            </View>

            <View className={'flex flex-row justify-between mx-7 mt-5'}>
                <CustomButton addStyle={`${patrolType==='Internal' ? 'bg-cyan-800': 'bg-cyan-500'}`} onPress={()=> setPatrolType("Internal")}>
                    <Text className={'text-white'}>Internal</Text>
                </CustomButton>
                <CustomButton addStyle={`${patrolType==='External' ? 'bg-cyan-800': 'bg-cyan-500'}`} onPress={()=> setPatrolType("External")}>
                    <Text className={'text-white'}>External</Text>
                </CustomButton>
                <CustomButton addStyle={`${patrolType==='Carpark' ? 'bg-cyan-800': 'bg-cyan-500'}`} onPress={()=> setPatrolType("Carpark")}>
                    <Text className={'text-white'}>Carpark</Text>
                </CustomButton>
            </View>
            <View className={'px-7 mt-5'}>
                <Text>Patrol Type: {patrolType}</Text>
            </View>
            <View className={'mx-7 mt-3'}>
                    <TextInput
                        className={'px-5 py-3 bg-slate-100'}
                        textAlignVertical={'top'}
                        multiline
                        numberOfLines={10}
                        onChangeText={(val) => setNotes(val)}
                        placeholder={'Comments or Notes'}
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
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
                    setPatrolStarted(false);
                    setNotes("");
                    setPatrolType("");
                    setModalVisible(false);
                    await addPatrolHandler('END', notes, patrolType)

                }}>
                    <Text className={'text-white text-center text-lg'}>Save Patrol</Text>
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