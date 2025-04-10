import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';

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
        // Diagonal ↘
        if (row <= size - winCondition && col <= size - winCondition) {
          const pattern = [];
          for (let i = 0; i < winCondition; i++) {
            pattern.push((row + i) * size + col + i);
          }
          patterns.push(pattern);
        }
        // Diagonal ↙
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

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>{winner ? (winner === "Draw" ? "It's a draw!" : `${winner} wins!`) : `Current Player: ${currentPlayer}`}</Text>

      <View style={{ ...styles.board, width: gridSize * 60, height: gridSize * 60 }}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={{ ...styles.cell, width: `${100 / gridSize}%`, height: `${100 / gridSize}%` }}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  turnText: { fontSize: 20, marginBottom: 20 },
  board: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  cell: { justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'black', backgroundColor: '#fff' },
  cellText: { fontSize: 24, fontWeight: 'bold' },
  resetButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
  resetButtonText: { color: '#fff', fontSize: 16 },
});