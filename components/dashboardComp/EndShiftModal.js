import ModalHeader from "./ModalHeader";
import {Modal, Text, TextInput, View} from "react-native";
import CustomButton from "../CustomButton";
import {useEffect, useState} from "react";
import {getStorage, removeStorage} from "../../utility/asyncStorage";
import {useAtom} from "jotai";
import {picture, site, user, event} from "../../atom/user";

export default function EndShiftModal(props) {

    const {modalVisible, setModalVisible, name, mySite, address, shiftOutHandler, myEvent} = props;
    const [inspectionType, setInspectionType] = useState("");
    const [reason, setReason] = useState("");
    const [useUser, setUserUser] = useAtom(user);
    const [useSite, setUseSite] = useAtom(site);
    const [usePicture, setUsePicture] = useAtom(picture);
    const [useEvent, setUseEvent] = useAtom(event);

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
                <ModalHeader setModalVisible={setModalVisible} title={'End Shift'} name={name} site={mySite} startShift={myEvent?.start}
                             address={address}/>
            </View>

            <View className={'mx-7 mt-4'}>
                    <TextInput
                        className={'px-5 py-3 bg-slate-100'}
                        textAlignVertical={'top'}
                        multiline
                        numberOfLines={12}
                        placeholder={'Reason for Early Shift out'}
                        onChangeText={text => setReason(text)}
                        value={reason}
                        style={{
                            elevation: 2, shadowColor: 'black',
                            shadowOpacity: 0.25,
                            shadowOffset: {width: 1, height: 2},
                            shadowRadius: 8
                        }}
                    />
            </View>

            <View className={'px-7 mt-4'}>
                <CustomButton addStyle={'bg-cyan-500'} onPress={async ()=> {
                    await shiftOutHandler(reason);
                    await removeStorage('user');
                    await removeStorage('site');
                    await removeStorage('picture');
                    await removeStorage('event');
                    setUseSite(null);
                    setUseEvent(null);
                    setUsePicture(null);
                    setUserUser(null);
                }}>
                    <Text className={'text-white text-center text-lg'}>End Shift</Text>
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