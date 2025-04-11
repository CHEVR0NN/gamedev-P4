import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import xImage from './x.png';
import oImage from './o.png';

export default function Game() {
  const { size } = useLocalSearchParams();
  const gridSize = parseInt(size as string);

  const [board, setBoard] = useState<string[]>(Array(gridSize * gridSize).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    setBoard(Array(gridSize * gridSize).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  }, [gridSize]);

  const getWinCondition = (size: number) => {
    if (size <= 4) return 3;
    if (size <= 6) return 4;
    return 5;
  };

  const generateWinPatterns = (size: number) => {
    const patterns = [];
    const winCondition = getWinCondition(size);

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        // Horizontal
        if (col <= size - winCondition) {
          const pattern = [];
          for (let i = 0; i < winCondition; i++) {
            pattern.push(row * size + col + i);
          }
          patterns.push(pattern);
        }
        // Vertical
        if (row <= size - winCondition) {
          const pattern = [];
          for (let i = 0; i < winCondition; i++) {
            pattern.push((row + i) * size + col);
          }
          patterns.push(pattern);
        }
        // Diagonal left to right
        if (row <= size - winCondition && col <= size - winCondition) {
          const pattern = [];
          for (let i = 0; i < winCondition; i++) {
            pattern.push((row + i) * size + col + i);
          }
          patterns.push(pattern);
        }
        // Diagonal right to left
        if (row <= size - winCondition && col >= winCondition - 1) {
          const pattern = [];
          for (let i = 0; i < winCondition; i++) {
            pattern.push((row + i) * size + col - i);
          }
          patterns.push(pattern);
        }
      }
    }

    return patterns;
  };

  const checkWinner = (newBoard: string[]) => {
    const winPatterns = generateWinPatterns(gridSize);
    for (let pattern of winPatterns) {
      const [a, ...rest] = pattern;
      if (newBoard[a] && rest.every(i => newBoard[i] === newBoard[a])) {
        return newBoard[a];
      }
    }
    return newBoard.includes("") ? null : "Draw";
  };

  const handlePress = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(gridSize * gridSize).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  // Calculate cell size dynamically based on grid size
  const cellSize = gridSize <= 4 ? 80 : gridSize <= 6 ? 60 : 50;

  return (
    <LinearGradient colors={['#fff', '#f4fffe']} style={styles.container}>
      {/* Player 2's Turn */}
      <View style={styles.top}>
        <View style={[styles.turnBox, { backgroundColor: '#f49019', top: 0 }]}>
          <Text style={[styles.turnText, currentPlayer === "O" && { transform: [{ rotate: '180deg' }] }]}>
            {currentPlayer === "O" ? "Your turn" : ""}
          </Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.back} onPress={() => router.push("/modeselection")}>
          <Text style={styles.backtext}>Go back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetGame} style={styles.back}>
          <Text style={styles.backtext}>Reset Game</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resulttxt}>{winner ? (winner === "Draw" ? "It's a draw!" : `${winner} wins!`) :" "}</Text>

      {/* Game Board */}
      <View style={{ ...styles.board, width: gridSize * cellSize, height: gridSize * cellSize }}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={{
              ...styles.cell,
              width: `${100 / gridSize}%`,
              height: `${100 / gridSize}%`,
            }}
            onPress={() => handlePress(index)}
          >
            {cell === "X" && <Image source={xImage} style={styles.icon} />}
            {cell === "O" && <Image source={oImage} style={styles.icon} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Player 1's Turn */}
      <View style={styles.bottom}>
        <View style={[styles.turnBox, { backgroundColor: '#2ec4b6', bottom: 0 }]}>
          <Text style={styles.turnText}>
            {currentPlayer === "X" ? "Your turn" : ""}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  back: { alignSelf: "flex-start", marginTop: 30, padding: 10 },
  backtext: { color: "#000", fontSize: 18, fontFamily: "Poppins", fontWeight: "600", textAlign: "center", textDecorationLine: "underline" },  
  turnBox: { position: 'absolute', width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' },
  turnText: { fontSize: 24, fontWeight: 'bold', color: 'white' },  
  board: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  cell: { justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white', backgroundColor: '#35dccc' },
  cellText: { fontSize: 24, fontWeight: 'bold' },
  top: { position: 'absolute', top: 0, width: '100%', alignItems: 'center', paddingTop: 10 },
  bottom: { position: 'absolute', bottom: 0, width: '100%', alignItems: 'center', paddingBottom: 10 },
  buttons: { flexDirection: "row", justifyContent: "space-between", width: "100%"},
  icon: { resizeMode: "contain", height: 40, width: 40 },
  resulttxt: { fontSize: 24, fontWeight: 'bold', color: '#f49019' }, 
});
