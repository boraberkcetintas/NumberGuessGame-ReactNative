import { Text, View, StyleSheet, Image, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import Color from "../constants/Color";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundCount, userNumber, onStartNewGame }) {
    const { width, height } = useWindowDimensions();
    let imageSize = 300;
    if (width < 380) {
        imageSize = 150;
    }
    if (height < 380) {
        imageSize = 100;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }
    return (
        <View style={styles.rootContainer}>
            <Title>Game is Over!</Title>
            <View style={[styles.imageContainer, imageStyle]}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/success.png')} />
            </View>
            <Text style={styles.summaryText}>
                It took <Text style={styles.highlightText}>{roundCount}</Text> guesses to find
                <Text style={styles.highlightText}> {userNumber}</Text>.
            </Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
    );
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    imageContainer: {
        borderWidth: 4,
        borderColor: Color.primary600,
        overflow: 'hidden',
        margin: 24
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 23,
        marginBottom: 18,
        textAlign: 'center',
    },
    highlightText: {
        fontFamily: 'open-sans-bold',
        color: Color.primary500,
        fontSize: 32,
    }
});