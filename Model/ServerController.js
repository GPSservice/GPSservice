import Axios from "axios";

//여기서 url과 data세팅 후 각 request를 보냄
export async function UrlandDataSetting(url, data) {
    let returnValue = false;
    
    //////////// github에 올릴떄 이부분 수정 ////////////
      //AWS연결
    const AWSurl = "http://gpsservice-env.eba-yrtfesnt.ap-northeast-2.elasticbeanstalk.com/";
      //localhost 연결
    //const AWSurl = "http://10.0.2.2:80/";
    ///////////////////////////////////////////////////

    if(url == "locationInsert") {
        const sendUrl = AWSurl + "post/location.php";
        const sendData = {
            latitude: data.latitude,
            longitude: data.longitude,
        };
        returnValue = await POSTrequest(sendUrl, sendData);
    }
    else if(url == "loginVerify") {
        const sendUrl = AWSurl + "get/loginVerify.php";
        const sendData = data; //{userID, userPW}
        returnValue = await GETrequest(sendUrl, sendData);
    }
    else if(url == "populationData") {
        const sendUrl = AWSurl + "get/populationData.php";
        const sendData = {
            latitude: data.latitude,
            longitude: data.longitude,
        };
        returnValue = await GETrequest(sendUrl, sendData);
    }
    return returnValue;
}


export async function GETrequest(url, data) {
    //실제 get 서버통신 진행
    let returnResult = false;
    await Axios.get(url,  {
        params: {
            data: data
        },
    })
    .then(function(response) {
        returnResult = response.data; //서버 통신 성공
    })
    .catch(function(error) {
        console.log("error: ", error);
        returnResult = {
            result: false,
            errorMessage: "서버 연결 에러",
        };
    });

    return returnResult;
}


export async function POSTrequest(url, data) {
    //실제 post 서버통신 진행
    let returnResult = false;
    await Axios.post(url,  {
        headers: "'Content-Type': 'application/json'",
        data: data,
    })
    .then(function(response) {
        returnResult = response.data; //서버 통신 성공
    })
    .catch(function(error) {
        console.log("error: ", error);
        returnResult = {
            result: false,
            errorMessage: "서버 연결 에러",
        };
    });

    return returnResult;
}


export async function PUTrequest(url, data) {
    //전체 업데이트
}


export async function PATCHrequest(url, data) {
    //부분 업데이트
}


export async function DELETErequest(url) {
    //삭제
}