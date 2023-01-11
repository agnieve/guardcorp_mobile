import ModalHeader from "./ModalHeader";
import {Modal, Text, TextInput, View} from "react-native";
import CustomButton from "../CustomButton";
import {useState} from "react";

export default function EndShiftModal(props) {

    const {modalVisible, setModalVisible, name, site, address, event} = props;
    const [inspectionType, setInspectionType] = useState("");

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
                <ModalHeader setModalVisible={setModalVisible} title={'End Shift'} name={name} site={site} startShift={event?.start}
                             address={address}/>
            </View>

            {/*<View className={'mx-7 mt-3'}>*/}
            {/*        <TextInput*/}
            {/*            className={'px-5 py-3 bg-slate-100'}*/}
            {/*            textAlignVertical={'top'}*/}
            {/*            multiline*/}
            {/*            numberOfLines={10}*/}
            {/*            placeholder={'Comments or Notes'}*/}
            {/*            // onChangeText={text => onChangeText(text)}*/}
            {/*            // value={value}*/}
            {/*            style={{*/}
            {/*                elevation: 2, shadowColor: 'black',*/}
            {/*                shadowOpacity: 0.25,*/}
            {/*                shadowOffset: {width: 1, height: 2},*/}
            {/*                shadowRadius: 8*/}
            {/*            }}*/}
            {/*        />*/}
            {/*</View>*/}

            <View className={'px-7 mt-20'}>
                <CustomButton addStyle={'bg-cyan-500'}>
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