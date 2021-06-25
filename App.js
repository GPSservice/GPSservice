import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import Loading from "./View/Loading";
import * as GetLocation from "./Model/getLocation"; //getData함수 호출
import * as Controller from "./Model/ServerController";


//React 컴포넌트 class를 정의하려면 React.Component를 상속받아야함
export default class extends React.Component {
  state = {
    isLoading: true,
    location: {
      latitude: null,
      longitude: null,
    }
  };

  getLocation = async() => {
    const locationData = await GetLocation.getLocation();
    let count = 1;
    while(this.locationDBInsert(locationData)) { 
      //5번까지 요청해보고 안되면 그냥 랜더링
      if(count >= 5) {
        break;
      }
      count++;
    }
    this.setState({
      isLoading: false,
      location: locationData,
    });
  }

  async locationDBInsert(locationData) {
    //DB전송
    const url = "locationInsert";
    const result = await Controller.POSTrequest(url, locationData);
    return result;
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const isLoading  = this.state.isLoading;
    const locationData = this.state.location;
    if(isLoading) {
      return (
        <Loading />
      );
    }
    else{
      console.log(locationData);
      if(locationData == null) {
        //사용자가 location권한을 거부함
        Alert.alert("GPS를 켜야합니다.");
      }
      else{
        return (
          <View style={styles.container}>
            <Text style={styles.text}> 왜 안뜨지? </Text>
            <Text style={styles.text}> {locationData.latitude} / {locationData.longitude} </Text>
          </View>
        );
      }
    }
  }
  /*componentWillUnmount() {

  }*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 24,
    color: 'black',
  }
});
