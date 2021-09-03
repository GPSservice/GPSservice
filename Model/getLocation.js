import * as Location from "expo-location";
import * as Controller from "./ServerController";
//메인화면에서 위치 얻기
export async function getLocation() {
  try {
    await Location.requestForegroundPermissionsAsync(); //사용자 권한 얻기
    //사용자가 permission을 안주면 에러가 발생하고 catch로 넘어감
    const location = await Location.getCurrentPositionAsync(); //현재 위치 얻기
    return location.coords;
  } catch(error) {
    return null;
  }
}

export async function locationDBInsert(userLocationData) {
  try {
    const url = "locationInsert";
    const data = {
      userID: userLocationData.userID,
      location: {
        latitude: userLocationData.location.latitude,
        longitude: userLocationData.location.longitude,
      },
    };
    
    //DB전송
    let count = 0;
    do {
      //5번까지 요청해보고 안되면 그냥 false반환
      let res = await Controller.UrlandDataSetting(url, data);
      if(res) {
        //DBinsert성공 
        return true;
      } 
      else{
        count++;
      }
    } while(count < 5);
    return false;
  } catch(error) {
    return false;
  }
}
