import {getStorage} from "../asyncStorage";
import {BACKEND_BASE_URL} from "../../constants/env";


export async function addPatrol(data){

    const user = await getStorage('user');

    const response = await fetch(`${BACKEND_BASE_URL}/patrol/add`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(data)
    });

    const resp = await response.json();
    return resp;
}

export async function getPatrols(eventId){
    const user = await getStorage('user');

    const response = await fetch(`${BACKEND_BASE_URL}/patrol/find?eventId=${eventId}`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`
        }
    });

    const resp = await response.json();
    return resp;
}