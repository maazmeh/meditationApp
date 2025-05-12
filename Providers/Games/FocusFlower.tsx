import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const FocusFlower: React.FC = () => {
  const [flowerStage, setFlowerStage] = useState(0);
  const [watered, setWatered] = useState(false);
  const [trimmed, setTrimmed] = useState(false);
  const [sunlight, setSunlight] = useState(false);
  const [growth, setGrowth] = useState(new Animated.Value(1));

  const flowerImages = [
    require('../../src/assets/plants/flower1.png'),
    require('../../src/assets/plants/flower2.png'),
    require('../../src/assets/plants/flower3.png'),
  ];

  const handleWater = () => {
    setWatered(true);
    growFlower();
  };

  const handleTrim = () => {
    setTrimmed(true);
    growFlower();
  };

  const handleSunlight = () => {
    setSunlight(true);
    growFlower();
  };

  const growFlower = () => {
    if (watered && trimmed && sunlight) {
      Animated.timing(growth, {
        toValue: 1.5,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        setFlowerStage((prevStage) => (prevStage + 1) % flowerImages.length);
        setWatered(false);
        setTrimmed(false);
        setSunlight(false);
        setGrowth(new Animated.Value(1));
      });
    }
  };

  return (
    <LinearGradient colors={['#6DD5FA', '#2980B9']} style={styles.container}>
      <Text style={styles.title}>Focus Flower</Text>
      <Text style={styles.instructions}>Nurture the flower by practicing mindfulness activities.</Text>
      <Animated.Image source={flowerImages[flowerStage]} style={[styles.flower, { transform: [{ scale: growth }] }]} />
      <View style={styles.toolsContainer}>
        <TouchableOpacity style={styles.toolButton} onPress={handleWater}>
          <Text style={styles.toolText}>Water</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={handleTrim}>
          <Text style={styles.toolText}>Trim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={handleSunlight}>
          <Text style={styles.toolText}>Sunlight</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Watered: {watered ? 'Yes' : 'No'}</Text>
        <Text style={styles.progressText}>Trimmed: {trimmed ? 'Yes' : 'No'}</Text>
        <Text style={styles.progressText}>Sunlight: {sunlight ? 'Yes' : 'No'}</Text>
      </View>
      <View style={styles.activityContainer}>
        <Text style={styles.activityText}>Complete the following mindfulness activity:</Text>
        <Text style={styles.activityPrompt}>Take a deep breath and relax your mind.</Text>
      </View>
    </LinearGradient>
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
    color: 'white',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  flower: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  toolsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  toolButton: {
    padding: 10,
    backgroundColor: '#87ceeb',
    borderRadius: 5,
  },
  toolText: {
    color: 'white',
    fontSize: 18,
  },
  progressContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white',
  },
  activityContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  activityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  activityPrompt: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
    color: 'white',
  },
});

export default FocusFlower;