import React, { useRef, useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert} from "react-native"; 
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

import * as PopulationData from "../Model/locationInMapData";

export default class MapViewHome extends React.Component {
    constructor(props) {
        super(props); //super(props) 사용 권고
        const location = props.route.params.data;
        this.state = {
            region: {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.03,
            },
            markerShow: false,
            markerView: [],
        };

    }

    onRegionChange = (region) => {
        this.setState({region: region});
    }
    researchHandler() {
        this.setState({markerShow: true});
        /* 이 지역 재검색 누를때마다 서버 통신해서 
            sendData for server: 지도의 기준 latitude, longitude, latitudeDelta, longitudeDelta
            getData by server: 유동인구 기준점 위경도(Array)
                            => 이 Array를 markerView에 넣음
        */
    }
    markerCreate = () => {
        return <PopulationMarker regionData={this.state.region}></PopulationMarker>;
    }

    render() {
        return(
            <View style={mapStyles.container}>
                <View>
                    <View style={mapStyles.researchButtonContainer}>
                        <TouchableOpacity
                            style={mapStyles.researchButton}
                            onPress={() => this.researchHandler()}
                        >
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <AntDesign name="reload1" size={20} style={mapStyles.buttonIcon}/>
                            <Text style={mapStyles.buttonText}>이 지역 재검색</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <MapView 
                        initialRegion={this.state.region}
                        onRegionChange={this.onRegionChange}
                        style={mapStyles.mapView}
                    >
                        {this.state.markerView}
                    </MapView>
                </View>
            </View>
        );
    }

    async componentDidUpdate() {
        if(this.state.markerShow) {
            const GETpopulationData = await PopulationData.requestPopulationData(this.state.region);
            if(GETpopulationData === false) {
                Alert.alert("데이터 불러오기 실패. 재검색을 다시 눌러주세요.");
            }
            else{
                //populationMarker resetting
                let markerArr = [];
                const deltaData = {
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta,
                }
                for(let tmpArr of GETpopulationData) {
                    const tmpPushData = <PopulationMarker 
                                            data={tmpArr} 
                                            regionDelta={deltaData}
                                        > </PopulationMarker>;
                    //const tmpPushData = new PopulationMarker(tmpArr);
                    markerArr.push(tmpPushData);
                }
                this.setState({
                    markerView: markerArr,
                    markerShow: false,
                });
            }
        }
    }
}


export class PopulationMarker extends React.Component {
    constructor(props) {
        super(props);
        console.log("프로프스다 임마\n", props);
        this.state = {
            id: props.data.id,
            age: props.data.age,
            gender: props.data.gender,
            job: props.data.job,
            region: props.data.regionData,
            deltaData: props.regionDelta,
        }
    }

    markerStyle = (GETlatitudeDelta, GETlongitudeDelta) => {
        let markerWidth = 4 / GETlatitudeDelta;
        if(markerWidth < 30)
            markerWidth = 30;
        else if(markerWidth > 100)
            markerWidth = 100;
        let markerHeight = 4 / GETlongitudeDelta;
        if(markerHeight < 30)
            markerHeight = 30;
        else if(markerHeight > 100)
            markerHeight = 100;
        
        return ({
            zIndex: 3,
            width: markerWidth, 
            height: markerHeight, 
            backgroundColor: "rgba(221, 160, 221, 0.6)",
            borderRadius: 100,
        });
    }

    render() {
        return(
            <Marker
                coordinate={{
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude,
                }}
            >
                <View
                    style={this.markerStyle(this.state.deltaData.latitudeDelta, this.state.deltaData.longitudeDelta)}
                >
                    <View style={markerStyles.container}>
                        <View style={markerStyles.marker}></View>
                    </View>
                </View>
            </Marker>
        );
    }
}

const mapStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapView: {
        zIndex: 0,
        width: "100%",
        height: "100%",
    },
    researchButtonContainer: {
        flex: 1,
        position: "absolute",
        zIndex: 1,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 20,
        width: 150,
        height: 30,
    },
    researchButton: {
        borderRadius: 10,
        width: 150,
        height: 30,
        backgroundColor: "#696969",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonIcon: {
        flex: 1,
        textAlign: "right",
        alignSelf: "center",
    },
    buttonText: {
        flex: 4,
        fontSize: 15,
        color: "#ffffff",
        textAlign: "center",
        textAlignVertical: "center",
    }
});

const markerStyles = StyleSheet.create({
    container: {
        zIndex: 2,
        elevation: 2,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
    },
    marker: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(221, 160, 221, 0.6)",
    }
});