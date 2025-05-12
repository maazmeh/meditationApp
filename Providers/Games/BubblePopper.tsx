import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../styles/theme';

const { width } = Dimensions.get('window');

const BubblePopper: React.FC = () => {
  const { isLightTheme } = useTheme();
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [bubbles, setBubbles] = useState<any[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const cardHeight = 400; // Assume card height is fixed to 400, adjust as needed
  const stressReliefTechniques = [
    'Deep Breathing',
    'Stretching',
    'Positive Affirmations',
    'Mindfulness',
    'Progressive Muscle Relaxation',
    'Visualization',
    'Yoga',
    'Meditation',
  ];

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        addBubble();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameStarted]);

  const addBubble = () => {
    const newBubble = {
      id: bubbles.length,
      technique: stressReliefTechniques[Math.floor(Math.random() * stressReliefTechniques.length)],
      x: Math.random() * (width - 50),
      y: new Animated.Value(cardHeight),
    };
    setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
    animateBubble(newBubble);
  };

  const animateBubble = (bubble: any) => {
    Animated.timing(bubble.y, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => {
      setBubbles((prevBubbles) => prevBubbles.filter((b) => b.id !== bubble.id));
    });
  };

  const popBubble = (id: number) => {
    setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== id));
  };

  const startGame = () => {
    setBubbles([]);
    setGameStarted(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Bubble Popper</Text>
      <Text style={[styles.instructions, { color: theme.textColor }]}>
        Pop the bubbles to learn stress-relief techniques!
      </Text>
      <View style={styles.gameContainer}>
        {bubbles.map((bubble) => (
          <Animated.View key={bubble.id} style={[styles.bubble, { left: bubble.x, bottom: bubble.y }]}>
            <TouchableOpacity onPress={() => popBubble(bubble.id)}>
              <Text style={styles.bubbleText}>{bubble.technique}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      {!gameStarted && (
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
  gameContainer: {
    width: '100%',
    height: 400, // Fixed height for the game container within the card
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    position: 'relative',
  },
  bubble: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(173, 216, 230, 0.7)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  startButton: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default BubblePopper;