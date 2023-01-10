import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveStorage(key, item){
    const jsonValue = JSON.stringify(item)
    await AsyncStorage.setItem(key, jsonValue)
}

export async function getStorage(key){
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export async function removeStorage(key){
    await AsyncStorage.removeItem(key);
}