import 'react-native-gesture-handler';
import React, {useState} from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, Alert, TouchableOpacity} from "react-native";

import * as LoginVerify from '../Model/loginVerify';

//check LoginVerify
async function checkLogin(userID, userPW, {navigation}) {
    const getLoginMessage = await LoginVerify.loginDBselect(userID, userPW);
    if(getLoginMessage.result) {
      //로그인 성공
      navigation.navigate("HomeScreen", { userID: userID });
    }
    else{
      //로그인 실패
      Alert.alert(getLoginMessage.errorMessage);
    }
}

function LoginScreen ({navigation}) {
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      // const usernameUpdate = (value) => {
      //                 setUsername(value);
      // };
      // const passwordUpdate = (value) => {
      //                 setPassword(value);
      // };
      // const onLogin = () => {
      //                Alert.alert('Credentials', "username :" + username + "password :" + password);
                     
      // };
    
        return (
                <View style={styles.container}>
                <Text style = {{fontWeight : 'bold', fontSize: 25, color: '#E6E6FA'}}>GPSservice</Text>
                <Image source = {require("../assets/login_icon.png")} style = {{width: 50, height: 50, marginBottom: 10}} />
                  <TextInput
                    value={this.state.username}
                    onChangeText={(value) => setUsername(value)}
                    placeholder={'Username'}
                    style={styles.textbox}
                  />
                  <TextInput
                    value={this.state.password}
                    onChangeText={(value) => setPassword(value)}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.textbox}
                  />
                  <View style={styles.btnContainer, {marginTop: -10}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.buttons}>
                      <Text style={{fontSize: 15, color: "#FFFFFF"}}>아직 회원이 아니신가요?</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.goto}>
                    <TouchableOpacity onPress={() => checkLogin(username, password, {navigation})} style={styles.buttons}>
                      <Text style={{fontSize: 20, color: "#000000"}}>login</Text>
                    </TouchableOpacity>
                  </View>
                  
                  </View>
            );

    }

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        //paddingHorizontal: 30,
        //paddingVertical: 100,
        alignItems: "center",
        backgroundColor: "#9E81BE",
    },
    loadingText: {
        color: "#2c2c2c",
        fontSize: 25,
    },
    title: {
        fontSize : 25,
        fontWeight : 'bold',
    },
    subtitle: {
        fontSize: 10,
        color: '#03254c'
    },
    textbox: {
          width: 200,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: 'black',
          marginBottom: 10,
      },
    btnContainer: {
      alignSelf: "center",
      marginTop: 10,
      backgroundColor: "#00ff0000"
    },
    // buttons: {
    //   justifyContent: "center",
    //   width: 100,
    //   height: 30,
    // },
    goto: {
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#E6E6FA',
      backgroundColor: '#E6E6FA',
    },
})

