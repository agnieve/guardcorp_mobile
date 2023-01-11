import {IMGBB_KEY} from "../../constants/env";

export async function savePicture(picture){
    const form = new FormData();
    form.append('image', picture);

    const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_KEY}`, {
        method: "POST",
        body: form
    });

    const resp = await response.json();
    return resp;
}