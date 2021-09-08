import React, { useRef, useState } from "react";
import {
    StyleSheet, Text, View, TouchableOpacity, 
    Alert, Modal
} from "react-native"; 
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker, Callout } from "react-native-maps";

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
            try{
                const GETpopulationData = await PopulationData.requestPopulationData(this.state.region);
                if(GETpopulationData === false) {
                    Alert.alert("데이터 불러오기 실패. 재검색을 다시 눌러주세요.");
                }
                else{
                    //populationMarker resetting
                    this.setState({
                        markerView: null,
                    });
                    let markerArr = [];
                    const deltaData = {
                        latitudeDelta: this.state.region.latitudeDelta,
                        longitudeDelta: this.state.region.longitudeDelta,
                    }
                    for(let tmpArr of GETpopulationData) {
                        const tmpPushData = <PopulationMarker 
                                                data={tmpArr} 
                                                regionDelta={deltaData}
                                                key={tmpArr.id}
                                            > </PopulationMarker>;
                        markerArr.push(tmpPushData);
                    }
                    this.setState({
                        markerView: markerArr,
                        markerShow: false,
                    });
                }
            } catch(err) {
                Alert.alert(err);
            }
        }
    }
}


//marker
export class PopulationMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.data.id,
            markerInfo: {
                region: props.data.regionData,
                deltaData: props.regionDelta,
            },
            userInfo: {
                age: props.data.age.count,
                gender: props.data.gender.count,
                job: props.data.job.count,
                population: props.data.population,
            },
            modal: null,
        };
    }

    markerStyle = (GETdelta) => {
        //유동인구수에 따라서 marker의 크기 조정
        let markerWidth;
        let markerHeight;
        if(this.state.userInfo.population >= 10000) {
            markerWidth = 70;
            markerHeight = 70;
        }
        else if(this.state.userInfo.population >= 5000) {
            markerWidth = 50;
            markerHeight = 50;
        }
        else if(this.state.userInfo.population >= 1000) {
            markerWidth = 30;
            markerHeight = 30;
        }
        else {
            markerWidth = 20;
            markerHeight = 20;
        }
        
        return ({
            zIndex: 3,
            width: markerWidth, 
            height: markerHeight, 
            backgroundColor: "rgba(221, 160, 221, 0.6)",
            borderRadius: 100,
        });
    }

    //marker touch event 처리
    markerTouchEvent = (event) => {
        console.log(this.state.id, "번 marker 터치됨");
        this.setState({ modalVisible: true });
        
        let ageArr = [];
        for(let [key, value] of Object.entries(this.state.userInfo.age)) {
            ageArr.push(
                <View key={key}>
                    <Text> {key}대 : {value}</Text>
                </View>
            )
        }

        this.state.modal =  <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    this.setState({modalVisible: false});
                                }}
                            >
                                <View style={modalStyles.container}>
                                    <View style={modalStyles.modalView}>
                                        {/*modal close button*/}
                                        <TouchableOpacity onPress={()=>this.setState({modal: null})}>
                                            <Text> 닫기 </Text>
                                        </TouchableOpacity>
                                        {/* view populationInfo */}
                                        <Text style={modalStyles.modalText}> id: {this.state.id} </Text>
                                        <Text style={modalStyles.modalText}> 유동인구수: {this.state.userInfo.population} </Text>
                                        <View><Text> age </Text>{ageArr}</View>
                                        {/* <Text style={modalStyles.modalText}> age: {this.state.userInfo.age} </Text>
                                        <Text style={modalStyles.modalText}> gende: {this.state.userInfo.gender} </Text>
                                        <Text style={modalStyles.modalText}> job: {this.state.userInfo.job} </Text> */}
                                    </View>
                                </View>
                            </Modal>
    }

    render() {
        return(
            /* view modal if modalVisible==true */
            <Marker
                coordinate={{
                    latitude: this.state.markerInfo.region.lat,
                    longitude: this.state.markerInfo.region.lon,
                }}
                title={this.state.population}
                onPress = { e => this.markerTouchEvent(e)}
            >
                <View
                    style={this.markerStyle(this.state.markerInfo.deltaData)}
                >
                    <View style={markerStyles.container}>
                        <View style={markerStyles.marker}>
                            {this.state.modal}
                        </View>
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
        backgroundColor: "rgba(221, 160, 221, 0.8)",
    }
});

const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: "90%",
        height: "100%",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText:{
        fontSize: 20,
        textAlign: "center",
    }
})