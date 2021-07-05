import * as Controller from "./ServerController";

//로그인 DB 확인작업
export async function loginDBselect(userID, userPW) {
    const url = "loginVerify";
    const data = {
        userID: userID,
        userPW: userPW,
    }
    const returnValue = await Controller.UrlandDataSetting(url, data);
    return returnValue;
}
