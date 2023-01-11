import {BACKEND_BASE_URL} from "../../constants/env";
import {getStorage} from "../asyncStorage";

export async function saveEvent(data) {

    const user = await getStorage('user');

    const response = await fetch(`${BACKEND_BASE_URL}/events/add`, {
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

export async function shiftOut(data) {

    const user = await getStorage('user');

    const response = await fetch(`${BACKEND_BASE_URL}/events/update`, {
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

export async function downloadEvent(eventId){
    const user = await getStorage('user');

    const response = await fetch(`${BACKEND_BASE_URL}/reports/download?eventId=${eventId}`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`
        }
    });

    const resp = await response.json();
    return resp;
}