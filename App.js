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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return <>
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
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false,
                                contentStyle: { backgroundColor: 'transparent' },
                                animation:'slide_from_right'
                            }}
                        >
                            <Stack.Screen
                                name='StartGame'
                                component={StartGameScreen}
                            />
                            <Stack.Screen
                                name='Game'
                                component={GameScreen}
                            />
                            <Stack.Screen
                                name='GameOver'
                                component={GameOverScreen}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    </>
}


const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    }
});