import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function modeselection() {
  const router = useRouter();

  const handleGridSelect = (size: number) => {
    router.push(`/game/${size}`);
  };

  return (
    <LinearGradient colors={['#2ec4b6', '#fff']} style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.push("/")}>
        <Text style={styles.backtext}>Go back</Text>
      </TouchableOpacity>


      <Text style={styles.title}>Select Grid Size</Text>
      <View style={styles.hr}/>
      <View style={styles.grid}>
        {[3, 4, 5, 6, 7, 8].map((size, index) => (
          <TouchableOpacity
            key={size}
            style={styles.button}
            onPress={() => handleGridSelect(size)}
          >
            <Text style={styles.buttonText}>{size} x {size}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, fontFamily: "Poppins", alignItems: "center" },
  back: { alignSelf: "flex-start", marginLeft: 20, marginTop: 30 },
  backtext: { color: "#fff", fontSize: 18, fontFamily: "Poppins", fontWeight: "600", textAlign: "center", textDecorationLine: "underline"},  
  title: { fontSize: 24, marginBottom: 10, color: "#fff", fontWeight: 700, textAlign: "center", marginTop: 70 },
  hr: { height: 1, backgroundColor: "#fff", width: "90%", marginVertical: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 20 },
  button: { backgroundColor: "#f49019", padding: 20, borderWidth: 3, borderColor: "#2ec4b6", width: 150, height: 130, marginBottom: 20, justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 20, fontFamily: "Poppins", fontWeight: "500", textAlign: "center", lineHeight: 30 },
});

//f49019 2ec4b6