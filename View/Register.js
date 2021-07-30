import 'react-native-gesture-handler';
import React, {useState} from "react";
import { AntDesign } from '@expo/vector-icons'
import SimpleSelectButton from 'react-native-simple-select-button';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Alert, Image, FlatList} from "react-native";

function RegisterScreen ({navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cf_password, setcfPassword] = useState("");
    const [sex, setSex] = useState("");
    const [job, setJob] = useState("");
    const button_list = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Unknown", value: "unknown" },
    ];
      return (
              <View style={styles.container}>
              <Text style = {{fontWeight : 'bold', fontSize: 25, color: '#E6E6FA', marginBottom: 5}}>Register</Text>
              <Image source = {require("../assets/register_icon.png")} style = {{width: 50, height: 50, marginBottom: 10}} />
              <View style={styles.info}>
                <Text style = {{fontWeight : 'bold', fontSize: 15, color: '#E6E6FA', marginBottom: 5 }}>Name</Text>
                {/* 이름 , 성별 , 나이 , 직업 */}
                <TextInput
                    value={this.state.username}
                    onChangeText={(value) => setUsername(value)}
                    placeholder={'Username'}
                    style={styles.textbox}
                    />
                <Text style = {{fontWeight : 'bold', fontSize: 15, color: '#E6E6FA', marginBottom: 5 }}>Sex</Text>
                <View style = {styles.sexs}>
                  <FlatList
                      data={button_list}
                      keyExtractor={item => item.value}
                      extraData={sex}
                      horizontal = {true}
                      renderItem={
                        ({ item }) => 
                          <View style = {{marginHorizontal: 5}}>
                              <SimpleSelectButton
                            onPress={() => setSex(item.value)}
                            isChecked={sex === item.value}
                            text={item.label}
                            textSize={14}
                            iconSize={14}
                            buttonDefaultColor="#E6E6FA"
                            buttonSelectedColor="#DA70D6"
                            textDefaultColor="#333"
                            textSelectedColor="#fff"
                            />
                          </View>
                          
                      }
                    />

              </View>

                <Text style = {{fontWeight : 'bold', fontSize: 15, color: '#E6E6FA', marginBottom: 5 }}>Password</Text>
                  <TextInput
                    value={this.state.password}
                    onChangeText={(value) => setPassword(value)}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.textbox}
                  />
                <Text style = {{fontWeight : 'bold', fontSize: 15, color: '#E6E6FA', marginBottom: 5}}>Check Password</Text>
                  <TextInput
                    value={this.state.cf_password}
                    onChangeText={(value) => setcfPassword(value)}
                    placeholder={'Enter the password once again'}
                    secureTextEntry={true}
                    style={styles.textbox}
                  />
                <Text style = {{fontWeight : 'bold', fontSize: 15, color: '#E6E6FA', marginBottom: 5 }}>Job</Text>
                  <TextInput
                    value={this.state.job}
                    onChangeText={(value) => setJob(value)}
                    placeholder={'Job'}
                    secureTextEntry={true}
                    style={styles.textbox}
                  />
                    <View style={styles.btnContainer}>
                      {/* DB에 넘기기 (if password === cf_password)*/}
                      {/* DB에 잘 넘어갔는지 check */}
                    <View style ={styles.goto}>
                      <TouchableOpacity onPress={() => {
                        Alert.alert("회원가입이 완료되었습니다."); 
                        navigation.navigate("Login");}} 
                        style={styles.buttons}>
                        <Text style={{fontSize: 20, color: "#000000"}}>confirm</Text>
                      </TouchableOpacity>
                    </View>

                  </View>

              </View>
                
                </View>
          );
  }

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        //paddingHorizontal: 30,
        //paddingVertical: 100,
        alignItems: "center",
        backgroundColor: "#9E81BE",
    },

    info: {
        width: 200
    },
    // buttons: {
    //   justifyContent: "center",
    //   width: 100,
    //   height: 30,
    //   backgroundColor: "#E6E6FA",
    // },
    btnContainer: {
      alignSelf: "center",
      marginTop: 10,
      backgroundColor: "#00ff0000"
    },
    textbox: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
  },
    sexs: {
      marginLeft: -5,
      width: 210
    },
    horizontalItem: {
      marginHorizontal: 20,
      
    },
    goto: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#E6E6FA',
      backgroundColor: '#E6E6FA',
    },
})