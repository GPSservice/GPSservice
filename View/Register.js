import 'react-native-gesture-handler';
import React, {useState} from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, Alert} from "react-native";

function RegisterScreen ({navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
      return (
              <View style={styles.container}>
              <Text style = {{fontWeight : 'bold', fontSize: 20, color: '#E6E6FA'}}>Register</Text>
              <View style={styles.info}>
                <Text style = {{fontWeight : 'bold', fontSize: 15, color: '#E6E6FA' }}>Name</Text>
                {/* 이름 , 성별 , 나이 , 직업 */}
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
                    title={'Confirm'}
                    style={styles.textbox}
                    onPress={() => Alert.alert("회원가입이 완료되었습니다.", 'hi')}
                    />
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
        marginLeft: 10
    }

})