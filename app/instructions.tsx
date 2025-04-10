import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function instructions() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>test</Text>
      
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
});
