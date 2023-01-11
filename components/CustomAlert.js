import {Modal, Text, View} from "react-native";
import CustomButton from "./CustomButton";


export default function CustomAlert(props) {

    const {modalVisible, setModalVisible, children} = props;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View className={'flex-1 justify-center items-center h-screen'}>
                <View className={'bg-white px-5 pt-8 pb-6 rounded-lg shadow-lg w-3/4'} style={{
                    elevation: 4, shadowColor: 'black',
                    shadowOpacity: 0.25,
                    shadowOffset: {width: 1, height: 2},
                }}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}