import 'react-native-gesture-handler';
import React, {useState} from "react";
import { AntDesign } from '@expo/vector-icons'
import SimpleSelectButton from 'react-native-simple-select-button';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Alert, Image, FlatList} from "react-native";

import * as RegisterRequest from "../Model/postRegister";

async function registerServerRequest(data, {navigation}) {
  const getMessage = await RegisterRequest.SignupDBInsert(data);
  if(getMessage.result) {
    Alert.alert("회원가입이 완료되었습니다."); 
    navigation.navigate("Login");
  }
  else{
    Alert.alert(getMessage.errorMessage);
  }
}

function checkRegister(data, {navigation}) {
  //회원가입 양식 확인
  const idReg = /^[a-zA-Z]+[a-zA-Z0-9]{5,15}$/;
  const pwReg = /^[a-zA-Z]+[a-zA-Z0-9~!@$%*]{7,19}$/;
  //데이터 확인
  if(data.id=="" || data.pw=="" || data.cfpw=="" || data.gender=="" || data.job=="" || data.age=="") {
    //데이터 중 누락된것이 있으면
    Alert.alert("전부 입력을 해주세요.");
  } 
  else if(!idReg.test(data.id)) {
    //id 정규식 확인
    Alert.alert("ID는 영문자로 시작하는 5~15자 영문자 또는 숫자이어야 합니다.");
  }
  else if(!pwReg.test(data.pw)){
    Alert.alert(
      "비밀번호는 영문자로 시작하는 8~20자 영문자,숫자 또는 특수문자이어야 합니다.",
      "특수문자 허용: ~, !, @, $, %, *"
    );
  }
  else if(data.pw!==data.cfpw) {
    Alert.alert("비밀번호와 비밀번호 확인이 동일하지 않습니다.");
  }
  else {
    //입력된것에 이상이 없으면 서버통신 진행
    registerServerRequest(data, {navigation});
    //회원가입 성공 여부는 이 함수에서 확인진행
  }
}

function RegisterScreen ({navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cf_password, setcfPassword] = useState("");
    const [sex, setSex] = useState("");
    const [job, setJob] = useState("Baeksu");
    const [age, setAge] = useState("10");
    const button_list = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Unknown", value: "unknown" },
    ];
    const sendData = {
      id: username,
      pw: password,
      cfpw: cf_password,
      gender: sex,
      job: job,
      age: age,
    };

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
                    placeholder={'ID'}
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
                  {/* job */}
                <View>
                  <Text style = {{fontWeight : 'bold', fontSize: 15, color: '#E6E6FA', marginBottom: 5 }}>Job</Text>
                <View>
                  <Picker
                    selectedValue={job}
                    onValueChange={(itemValue, itemIndex) =>
                      setJob(itemValue)
                    }
                  >
                    <Picker.Item label="무직" value="Baeksu"/>
                    <Picker.Item label="중,고등학생" value="SchoolStudent"/>
                    <Picker.Item label="대학생" value="UniversityStudent"/>
                    <Picker.Item label="취준생" value="JobSeeker"/>
                    <Picker.Item label="직장인" value="Worker"/>
                    <Picker.Item label="프리랜서" value="Freelancer"/>
                    <Picker.Item label="자영업자, 임원" value="CEO"/>
                    <Picker.Item label="공무원" value="OfficialWorker"/>
                    <Picker.Item label="그 외" value="etc"/>
                  </Picker>
                </View>
                </View>
                  {/* age */}
                <Text style = {{fontWeight : 'bold', fontSize: 15, color: '#E6E6FA', marginBottom: 5 }}>Age</Text>
                  <Picker
                      selectedValue={age}
                      onValueChange={(itemValue, itemIndex) =>
                        setAge(itemValue)
                      }
                    >
                    <Picker.Item label="10대" value="10"/>
                    <Picker.Item label="20대" value="20"/>
                    <Picker.Item label="30대" value="30"/>
                    <Picker.Item label="40대" value="40"/>
                    <Picker.Item label="50대" value="50"/>
                    <Picker.Item label="60대" value="60"/>
                    <Picker.Item label="70대 이상" value="70"/>
                  </Picker>


                    <View style={styles.btnContainer}>
                      {/* DB에 넘기기 (if password === cf_password)*/}
                      {/* DB에 잘 넘어갔는지 check */}
                    <View style ={styles.goto}>
                      <TouchableOpacity 
                        onPress={() => checkRegister(sendData, {navigation})} 
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