import React, {Component} from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from "./View/MainScreen";
import Loading from "./View/Loading";
import NewReminderScreen from "./View/login";
import * as GetLocation from "./Model/getLocation"; //getData함수 호출
import MapViewHome from './View/MapView.js';


export default function ScreenNavigation() {
  const Stack = createStackNavigator();
  state = {

  };
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Main"
        headerMode="screen"
      >
        <Stack.Screen name="Main" component={MainScreen.bind(this)} />
        <Stack.Screen name="Login" component={NewReminderScreen.bind(this)} options={{title: 'Login'}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="MapView" component={MapViewHome}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


//React 컴포넌트 class를 정의하려면 React.Component를 상속받아야함
class HomeScreen extends React.Component {
  state = {
    isLoading: true,
    LotsofTimedPassed: false, //true면은 너무 많은시간이 로딩된것임
    location: {
      latitude: null,
      longitude: null,
    }
  };

  getLocation = async() => {
    const locationData = await GetLocation.getLocation();
    await GetLocation.locationDBInsert(locationData); //locationData DBinsert
    this.setState({
      isLoading: false,
      location: locationData,
    });
  }

  NavigatorSetting(screenName, sendData) {
    if(sendData !== null) {
      this.props.navigation.navigate(
        screenName,
        {data: sendData}
      );
    }
    else{
      this.props.navigation.navigate(screenName);
    }
  }

  componentDidMount() {
    this.getLocation();
    setTimeout(
      function() { 
        this.setState({LotsofTimedPassed: true});
      }.bind(this),
      4000
    );
  }

  render() {
    const isLoading  = this.state.isLoading;
    const locationData = this.state.location;
    const lotp = this.state.LotsofTimedPassed;
    if(isLoading) {
      if(lotp) {
        return(
          Alert.alert("서버와 연결할 수 없습니다."),
          <Loading />
        );
      }
      else{
        return (
          <Loading />
        );
      }
    }
    else{
      if(locationData == null) {
        //사용자가 location권한을 거부함
        Alert.alert("GPS를 켜야합니다.");
        return (
          <View style={styles.container}>
            <Text style={styles.text}> 새로고침 후 GPS권한을 설정해주세요 </Text>
          </View>
        );
      }
      else{
        return (
          <View style={styles.container}>
            <Text style={styles.text}> {locationData.latitude} / {locationData.longitude} </Text>
            <View style={styles.mapContainer}>
              <TouchableOpacity
                onPress={() => this.NavigatorSetting("MapView", locationData)}
                style={styles.mapButton}
              >
                <Text style={[styles.text, {fontSize: 15}]}>go to map</Text>
              </TouchableOpacity>
            </View>
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
    textAlign: "center",
  },
  mapContainer: {
    alignSelf: "center",
    marginTop: 10,
  },
  mapButton: {
    justifyContent: "center",
    width: 100,
    height: 30,
    backgroundColor: "blue",
  }
});
