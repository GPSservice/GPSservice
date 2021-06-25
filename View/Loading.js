import React from "react";
import {StyleSheet, Text, View} from "react-native"; 

export default function Loading() {
    return (
        <View style={styles.container}>
            <Text style={styles.loadingText}> Loading... </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor: "#FDF6AA",
    },
    loadingText: {
        color: "#2c2c2c",
        fontSize: 25,
    }
})