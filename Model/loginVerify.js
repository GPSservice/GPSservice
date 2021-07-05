import * as Controller from "./ServerController";

export async function loginDBselect(userID, userPW) {
    const url = "loginVerify";
    const data = {
        userID: userID,
        userPW: userPW,
    }
    const returnValue = await Controller.UrlandDataSetting(url, data);
    return returnValue;
}
