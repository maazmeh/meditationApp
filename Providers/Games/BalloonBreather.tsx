import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../styles/theme';
import LinearGradient from 'react-native-linear-gradient';

const BalloonBreather: React.FC = () => {
  const { isLightTheme } = useTheme();
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds game
  const [gameStarted, setGameStarted] = useState(false);
  const balloonSize = useState(new Animated.Value(1))[0];
  const [breathingText, setBreathingText] = useState('Inhale');

  useEffect(() => {
    let timer: any;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameStarted(false);
      balloonSize.stopAnimation(); // Stop the balloon animation immediately
      balloonSize.setValue(1); // Reset balloon size to default when the game ends
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    if (gameStarted) {
      animateBalloon();
    }
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
  };

  const animateBalloon = () => {
    if (gameStarted && timeLeft > 0) {
      setBreathingText('Inhale');
      Animated.sequence([
        Animated.timing(balloonSize, {
          toValue: 1.5,
          duration: 4000, // Inhale for 4 seconds
          useNativeDriver: false,
        }),
        Animated.timing(balloonSize, {
          toValue: 1,
          duration: 4000, // Exhale for 4 seconds
          useNativeDriver: false,
        }),
      ]).start(() => {
        if (gameStarted && timeLeft > 0) { // Ensure the game is still running
          setScore((prevScore) => prevScore + 1);
          setBreathingText('Exhale');
          animateBalloon();
        } else {
          balloonSize.setValue(1);
          setBreathingText('Inhale'); // Reset breathing text when game ends
        }
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Balloon Breather</Text>
      <Text style={[styles.instructions, { color: theme.textColor }]}>Follow the breathing pattern to inflate the balloon!</Text>
      <Text style={[styles.score, { color: theme.textColor }]}>Score: {score}</Text>
      <Text style={[styles.timer, { color: theme.textColor }]}>Time Left: {timeLeft}s</Text>
      <View style={styles.balloonContainer}>
        <Animated.View style={[styles.outerBalloon, { transform: [{ scale: balloonSize }] }]}>
          <LinearGradient
            colors={['#6DD5FA', '#2980B9']}
            style={styles.innerBalloon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.breathingText}>{breathingText}</Text>
          </LinearGradient>
        </Animated.View>
      </View>
      {gameStarted ? (
        <Text style={[styles.breathingInstruction, { color: theme.textColor }]}>Inhale... Exhale...</Text>
      ) : (
        <TouchableOpacity style={[styles.startButton, {backgroundColor: theme.yesButtoncolor}]} onPress={startGame}>
          <Text style={[styles.buttonText, {color: theme.pillTextColor}]}>Start Game</Text>
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
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balloonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  outerBalloon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBalloon: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  breathingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  breathingInstruction: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
  },
});

export default BalloonBreather;