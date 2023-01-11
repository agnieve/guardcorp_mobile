import {Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {FlashList} from "@shopify/flash-list";
import {useEffect} from "react";


export default function ActivityLogsComp(props){

    const { data, setNewAction2 } = props;

    return(
        <View className="flex-1">
            <Text className="text-center text-lg text-white mt-3">Activity Logs</Text>
            <FlashList
                data={data}
                renderItem={({item}) => {
                      return  item.status === 'START' ? null :
                            <View className={'rounded-lg bg-slate-300 p-5 mx-3 mb-3'}>
                                <Text>{new Date(item.date ? item.date : item.dateTime).toLocaleDateString()} {new Date(item.date ? item.date : item.dateTime).toLocaleTimeString()}</Text>
                                <Text>{item.status ? 'Patrol' : 'Inspection'}</Text>
                                {item.type && <Text>{item.type}</Text>}
                                {item.notes && <Text>{item.notes}</Text>}
                            </View>
                }}
                estimatedItemSize={100}
            />
        </View>
    );
}