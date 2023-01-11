import {Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import CustomButton from "../CustomButton";
import {saveStorage} from "../../utility/asyncStorage";
import {FlashList} from "@shopify/flash-list";

export default function ReportLogsComp(props){

    const { data } = props;

    return(
        <View className="flex-1">
            <Text className="text-center text-lg text-white mt-3">Report Logs</Text>
            <FlashList
                data={data}
                renderItem={({item}) => <View className={'rounded-lg bg-slate-300 p-5 mx-3 mb-3'}>
                    <Text>{new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString()}</Text>
                    <Text>{item.type}</Text>
                    <Text>{item.notes}</Text>
                </View>}
                estimatedItemSize={100}
            />
        </View>
    )
}