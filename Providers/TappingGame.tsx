import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TappingGame: React.FC = () => {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds game
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameStarted(false);
    }
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    setGameStarted(true);
    setCount(0);
    setTimeLeft(10);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tapping Game</Text>
      <Text style={styles.instructions}>Tap the button as many times as you can in 10 seconds!</Text>
      <Text style={styles.count}>Taps: {count}</Text>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      {gameStarted ? (
        <TouchableOpacity
          style={styles.tapButton}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>Tap!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tapButton: {
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    marginBottom: 20,
  },
  startButton: {
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default TappingGame;