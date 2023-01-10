import {TextInput} from "react-native";

export default function Input(props){

    const { value, onChangeText, placeholder } = props;

    return (
        <TextInput
            className={'border border-slate-100 py-2 px-4 rounded-lg bg-slate-100'}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            keyboardType="characters"
        />
    );
}