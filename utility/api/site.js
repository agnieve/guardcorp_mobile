import {BACKEND_BASE_URL} from "../../constants/env";
import {getStorage} from "../asyncStorage";

export async function getNearSites(coords){

    const user = await getStorage('user');

    const response = await fetch(`${BACKEND_BASE_URL}/sites/near`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(coords)
    });

    const resp = await response.json();
    return resp;
}
