import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Entypo } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";
import { useNavigation, useRoute } from '@react-navigation/native';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.round(Math.random() * (max - min)) + min;

    if (rndNum === max) return rndNum - 1;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

function directionIsValid(direction, currentGuess, userNumber) {
    if ((direction === 'lower' && currentGuess > userNumber) || (direction === 'higher' && currentGuess < userNumber)) {
        return true;
    } else return false;
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen() {

    useEffect(() => {
        minBoundry = 1;
        maxBoundry = 100;
    }, [])

    const initGuess = generateRandomBetween(minBoundry, maxBoundry, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initGuess);
    const [guessRounds, setGuessRounds] = useState([initGuess]);
    const { width, height } = useWindowDimensions();
    const route = useRoute();
    const navigation = useNavigation();
    const userNumber = route.params.userNumber;

    function nextGuessHandler(direction) {
        if (directionIsValid(direction, currentGuess, userNumber)) {
            if (direction === 'higher') {
                minBoundry = currentGuess + 1;
            } else {
                maxBoundry = currentGuess;
            }
            const nextGuess = generateRandomBetween(minBoundry, maxBoundry, currentGuess);
            setCurrentGuess(nextGuess);
            setGuessRounds((guessRounds) => [nextGuess, ...guessRounds]);
        } else {
            Alert.alert('Misleading!', "This is wrong.", [{ text: 'Sorry!', style: "cancel" }])
        }
    }

    useEffect(() => {
        if (currentGuess === userNumber) {
            //onGameIsOver(guessRounds.length);
            navigation.replace('GameOver', {
                userNumber: userNumber,
                roundCount: guessRounds.length
            });
            minBoundry = 1;
            maxBoundry = 100;
        }
    }, [currentGuess, userNumber]);



    const guessRoundsListLength = guessRounds.length;
    const marginTopDistance = height < 400 ? 20 : 100;
    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>
                Higher or lower?
            </InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <Entypo name="arrow-bold-up" size={24} color="white" />High
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Entypo name="arrow-bold-down" size={24} color="white" />Low
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>

    if (width > height) {
        content = <>
            <View style={styles.buttonsContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <Entypo name="arrow-bold-up" size={24} color="white" /> High
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <NumberContainer>{currentGuess}</NumberContainer>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Entypo name="arrow-bold-down" size={24} color="white" />
                        Low
                    </PrimaryButton>
                </View>
            </View>
        </>
    }

    return (
        <View style={[styles.mainContainer, { marginTop: marginTopDistance }]} >
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => <GuessLogItem
                        roundNum={guessRoundsListLength - itemData.index}
                        guess={itemData.item}
                    />}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 24,
        alignItems: "center",
        marginTop: 100,
    },
    instructionText: {
        marginVertical: 12
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 12
    }
});