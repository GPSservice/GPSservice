import 'react-native-gesture-handler';
import React, {useEffect} from "react";
import {StyleSheet, Text, View, Image} from "react-native";

function MainScreen({navigation}) {
    useEffect(() => {
        setTimeout(() => {
           navigation.navigate('Login');
        }, 1000);
      }, []);
        
    return (
        
        <View style={styles.container}>
            <Image source = {require('../assets/gps_icon.png')}/>
            <Text style = {styles.title}>GPSservice</Text>
            <Text style = {styles.subtitle}>full of GPS info!</Text>
        </View>
    );
}

export default MainScreen;

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
    }
})