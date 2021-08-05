import * as Controller from "./ServerController";

//로그인 DB 확인작업
export async function SignupDBInsert(data) {
    const url = "signup";
    const sendData = {
        id: data.id,
        pw: data.pw,
        gender: data.gender,
        age: data.age,
        job: data.job,
    }
    console.log(sendData);
    const returnValue = await Controller.UrlandDataSetting(url, sendData);
    return returnValue;
}