import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../styles/theme';
import Draggable from 'react-native-draggable';

const { width, height } = Dimensions.get('window');

const ZenGarden: React.FC = () => {
  const { isLightTheme } = useTheme();
  const theme = isLightTheme ? lightTheme : darkTheme;
  const [elements, setElements] = useState<any[]>([]);
  const [meditationSession, setMeditationSession] = useState(0);

  const elementTypes = [
    { type: 'flower', source: require('../../src/assets/plants/flower1.png') },
    { type: 'flower', source: require('../../src/assets/plants/flower2.png') },
    { type: 'flower', source: require('../../src/assets/plants/flower3.png') },
    { type: 'plant', source: require('../../src/assets/plants/plant1.png') },
    { type: 'plant', source: require('../../src/assets/plants/plant1.png') },
    { type: 'plant', source: require('../../src/assets/plants/plant1.png') },
    { type: 'stone', source: require('../../src/assets/plants/stone1.png') },
    { type: 'stone', source: require('../../src/assets/plants/stone1.png') },
    { type: 'stone', source: require('../../src/assets/plants/stone1.png') },
  ];

  const unlockNewElement = () => {
    const newElementIndex = Math.floor(Math.random() * elementTypes.length);
    const newElement = { id: elements.length, ...elementTypes[newElementIndex] };
    setElements([...elements, newElement]);
  };

  const startMeditation = () => {
    setMeditationSession(meditationSession + 1);
    unlockNewElement();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Image source={require('../../src/assets/zenGardenBg.jpg')} style={styles.backgroundImage} />
      <Text style={styles.title}>Zen Garden</Text>
      <View style={styles.gardenContainer}>
        {elements.map((element) => (
          <Draggable key={element.id} x={75} y={100}>
            <Image source={element.source} style={styles.element} />
          </Draggable>
        ))}
      </View>
      <TouchableOpacity style={[styles.startButton,{backgroundColor: theme.yesButtoncolor}]} onPress={startMeditation}>
        <Text style={[styles.buttonText,{color:theme.buttonTextColor}]}>Add an item</Text>
      </TouchableOpacity>
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
    color:'black'
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color:'black'
  },
  gardenContainer: {
    width: '100%',
    height: 400,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    position: 'relative',
  },
  backgroundImage: {
    width: width - 45,
    height: height - 130,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
    zIndex: -1,
  },
  element: {
    width: 50,
    height: 50,
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

export default ZenGarden;