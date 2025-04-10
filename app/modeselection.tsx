import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function modeselection() {
  const router = useRouter();

  const handleGridSelect = (size: number) => {
    router.push(`/game/${size}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELECT GRID SIZE</Text>
      {[3, 4, 5, 6, 7, 8].map(size => (
        <TouchableOpacity key={size} style={styles.button} onPress={() => handleGridSelect(size)}>
          <Text style={styles.buttonText}>{size} x {size}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', fontFamily: "Poppins" },
  title: { fontSize: 24, marginBottom: 20 },
  button: { backgroundColor: "#f49019", padding: 20, borderRadius: 30, borderWidth: 3, borderColor: "#2ec4b6", width: "50%", marginBottom: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontFamily: "Poppins", fontWeight: "bold", textAlign: "center", },
});

//f49019 2ec4b6