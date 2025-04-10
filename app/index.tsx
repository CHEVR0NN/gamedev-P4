import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
      
      <View style={styles.indexcontainer}>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/modeselection")}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/instructions")}>
        <Text style={styles.buttonText}>How to play?</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  indexcontainer: {
    marginTop: 50,
    marginBottom: 20,
    gap: 20,
  },
  button: {
    backgroundColor: "#2ec4b6",
    padding: 20,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#f49019",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    width: "80%",
    height: "40%",
    marginBottom: 20,
    marginTop: 20,
  },
});