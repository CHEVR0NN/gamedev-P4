import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function Instructions() {
  return (
    <LinearGradient colors={["#2ec4b6", "#ffffff"]} style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.back} onPress={() => router.push("/")}>
        <Text style={styles.backtext}>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>☁︎ How to Play ☁︎</Text>
      <View style={styles.hr} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {[
          { title: "🎯 Objective", text: "Be the first to line up your symbol (X or O) horizontally, vertically, or diagonally. Game ends when someone wins or the board is full." },
          { title: "🎮 Gameplay", text: "Players take turns tapping any empty cell to mark it. The game switches between X and O automatically. The game is designed for 2 players, positioning your phone on 2 player sides is recommended." },
          { title: "🏆 Winning Conditions", text: "3x3 ➜ Align 3\n4x4 ➜ Align 3\n5x5 ➜ Align 4\n6x6 ➜ Align 4\n7x7 ➜ Align 5\n8x8 ➜ Align 5\n(✧ Try bigger boards for tougher fights!)" },
          { title: "🔄 Reset", text: "Press “Reset Game” to start over anytime. All marks will be cleared." },
          { title: "🔙 Back", text: "Tap 'Go Back' to return to the grid size screen. No progress saved." },
        ].map((item, i) => (
          <View style={styles.card} key={i}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, fontFamily: "Poppins", backgroundColor: "#ffffff" },
  scrollContent: { alignItems: "center", paddingBottom: 40, paddingTop: 10 },
  title: { fontSize: 28, color: "#ffffff", fontWeight: "700", textAlign: "center", marginTop: 40, marginBottom: 10, textShadowColor: "#00000040", textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 4 },
  hr: { height: 1, backgroundColor: "#ffffff", width: "100%", marginVertical: 20, opacity: 0.4 },
  card: { backgroundColor: "#f49019", padding: 20, borderRadius: 16, marginBottom: 20, width: "85%", borderWidth: 1.5, borderColor: "#2ec4b6", shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 4 },
  cardTitle: { fontSize: 20, fontWeight: "700", color: "#ffffff", textAlign: "center", marginBottom: 10 },
  cardText: { fontSize: 16, color: "#ffffff", fontFamily: "Poppins", textAlign: "center", lineHeight: 22, whiteSpace: "pre-line" },
  back: { alignSelf: "flex-start", marginLeft: 20, marginTop: 30 },
  backtext: { color: "#ffffff", fontSize: 18, fontFamily: "Poppins", fontWeight: "600", textAlign: "center", textDecorationLine: "underline" },
});
