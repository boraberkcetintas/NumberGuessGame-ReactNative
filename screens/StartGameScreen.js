import {
    TextInput, View, StyleSheet, Alert, useWindowDimensions,
    KeyboardAvoidingView, ScrollView
} from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Color from "../constants/Color";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onConfirmHandler }) {
    const [enteredNumber, setEnteredNumber] = useState('');
    const { width, height } = useWindowDimensions();

    function numberInputHandler(enteredNumber) {
        setEnteredNumber(enteredNumber);
    }

    function confirmInputHandler() {
        const number = parseInt(enteredNumber);
        if (isNaN(number) || number <= 0 || number > 99) {
            Alert.alert(
                'Invalid number!',
                'Number must be between 1 and 99',
                [{
                    text: 'Okay',
                    onPress: resetInputHandler,
                    style: 'destructive',
                }]
            );
        }
        onConfirmHandler(number);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }
    const marginTopDistance = height < 400 ? 40 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View style={[styles.mainContainer, { marginTop: marginTopDistance }]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>
                            Enter a Number
                        </InstructionText>
                        <TextInput
                            style={styles.numberInput}
                            maxLength={2}
                            keyboardType={"number-pad"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            onChangeText={numberInputHandler}
                            value={enteredNumber}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
    },
    mainContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: "center"
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 1,
    },
    numberInput: {
        fontFamily: 'open-sans',
        borderBottomColor: Color.primary500,
        borderBottomWidth: 2,
        width: 50,
        height: 50,
        marginVertical: 8,
        fontSize: 32,
        color: Color.primary500,
        textAlign: 'center',
        alignSelf: 'center'
    },
});

export default StartGameScreen;