import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useState } from 'react';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Color from './constants/Color';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [validNumber, setValidNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [roundCount, setRoundCount] = useState(null);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  function onConfirmHandler(validNumber) {
    setValidNumber(validNumber);
  }

  function onGameIsOverHandler(roundCount) {
    setGameIsOver(true);
    setRoundCount(roundCount);
  }

  function onStartNewGame() {
    setValidNumber(null);
    setRoundCount(0);
    setGameIsOver(false);
  }

  let screen = <StartGameScreen onConfirmHandler={onConfirmHandler} />

  if (validNumber) {
    screen = <GameScreen
      userNumber={validNumber}
      onGameIsOver={onGameIsOverHandler} />
  }

  if (gameIsOver) {
    screen = <GameOverScreen
      roundCount={roundCount}
      userNumber={validNumber}
      onStartNewGame={onStartNewGame}
    />
  }

  return (
    <>
      <StatusBar style='light' />
      <LinearGradient
        colors={[Color.primary500, Color.primary550]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require('./assets/images/background.jpg')}
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
          resizeMode='cover'
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  )

}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  }
});
