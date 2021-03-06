import * as Controller from "./ServerController";

//서버 통신 후 데이터 얻어오기
export async function requestPopulationData(region) {
    const populationDataArr = [];
    const requestResult = await Controller.UrlandDataSetting("populationData", region);
    if(requestResult.statusCode === 200) {
        for(let tmpArr of requestResult.body) {
            const tmpData = new PopulationData(tmpArr);
            populationDataArr.push(tmpData);
        }
        return populationDataArr;
    }
    else{
        //server connect failed
        return requestResult.result;
    }
}


//유동인구 데이터의 구조
class PopulationData{
    constructor(props) {
        this.setterID(props.id);
        this.setterAge(props.resultData.age);
        this.setterGender(props.resultData.gender);
        this.setterJob(props.resultData.job);
        this.setterPopulation(props.population);
        this.setterRegionData(props.centroids);
    }

    /// setData ///
    setterID (id) {
        this.id = id;
    }
    setterAge(age) {
        this.age = age; //descending sorting array
    }
    setterGender(gender) {
        this.gender = gender; //descending sorting array
    }
    setterJob(job) {
        this.job = job; //descending sorting array
    }
    setterPopulation(population) {
        this.population = population;
    }
    setterRegionData(regionData) {
        this.regionData = regionData; //JSON (latitude, longitude)
    }

    /// getData ///
    getterID() {
        return this.id;
    }
    getterAge() {
        return this.age;
    }
    getterGender() {
        return this.gender;
    }
    getterJob() {
        return this.job;
    }
    getterPopulation() {
        return this.population;
    }
    getterRegionData() {
        return this.regionData;
    }
}

//clensingLocationData table에 있는 id값 조회
//clensingLocationData table에는 id와 기준점이 되는 latitude, longitude 저장

