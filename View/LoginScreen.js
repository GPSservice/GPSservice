import 'react-native-gesture-handler';
import React, {useState} from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, Alert} from "react-native";

import * as LoginVerify from '../Model/loginVerify';

//check LoginVerify
async function chekcLogin(userID, userPW, {navigation}) {
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

//loginScreen (export default function)
function NewReminderScreen ({navigation}) {
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
                <Text style = {{fontWeight : 'bold', fontSize: 15}}>Login</Text>
                <Image source = {require("../assets/login_icon.png")}/>
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
                  <Button
                    title={'Login'}
                    style={styles.textbox}
                    onPress={() => chekcLogin(username, password, {navigation})}
                  />
                  </View>
            );

    }

export default NewReminderScreen;






const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        //paddingHorizontal: 30,
        //paddingVertical: 100,
        alignItems: "center",
        backgroundColor: "#1167b1",
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
      }
})