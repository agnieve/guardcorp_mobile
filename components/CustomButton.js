import {Pressable, StyleSheet} from "react-native";

export default function CustomButton(props){

    const { onPress, children, addStyle } = props;

    return(
        <Pressable android_ripple={{color: '#ccc'}} className={`bg-cyan-700 p-3 rounded-lg ${addStyle}`}
                   onPress={onPress}
        >
            {children}
        </Pressable>
    )
}
