import {BACKEND_BASE_URL} from "../../constants/env";

export async function verifyLicense(licenseNumber) {
    const response = await fetch(`${BACKEND_BASE_URL}/auth`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            licenseNumber: licenseNumber
        })
    });

    const resp = await response.json();
    return resp;
}