import Axios from "axios";

export async function GETrequest(url) {
    
}

export async function POSTrequest(url, data) {
    let returnResult = false;
    if(url == "locationInsert") {
        await Axios.post("http://10.0.2.2/post/location.php",  {
            headers: "'Content-Type': 'application/json'",
            data: {
                latitude: data.latitude,
                longitude: data.longitude,
            },
        })
        .then(function(response) {
            returnResult = response.data;
        })
        .catch(function(error) {
            console.log("error: ", error);
            returnResult = false;
        });
    }
    return returnResult;
    //요청에 대한 처리가 정상적으로 이루어지면 true 반환
}

export async function PUTrequest(url, data) {
    
}

export async function PATCHrequest(url, data) {
    
}

export async function DELETErequest(url) {
    
}