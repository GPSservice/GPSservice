import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, TouchableHighlight} from "react-native"; 
import { AntDesign } from "@expo/vector-icons";
import MapView from "react-native-maps";

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
        };
    }

    onRegionChange = (region) => {
        this.setState({region: region});
    }

    researchHandler() {
        console.log(this.state.region);
        //call the populationData in this region
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
                    />
                </View>
                {/* <PoupulationMarker>

                </PoupulationMarker> */}
            </View>
        );
    }
}

class PoupulationMarker extends React.Component{
    getPopulationData() {
        return;
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