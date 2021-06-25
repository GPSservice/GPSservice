import * as Location from "expo-location";

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
