import { View, Text, StyleSheet } from "react-native"
import Color from "../../constants/Color";

function GuessLogItem({ roundNum, guess }) {
    return (
        <View style={styles.logItemContainer}>
            <Text style={styles.itemText}>#{roundNum}</Text>
            <Text style={styles.itemText}>Opponent's guess is {guess}</Text>
        </View>
    );
}

export default GuessLogItem

const styles = StyleSheet.create({
    logItemContainer: {
        flexDirection: 'row',
        borderColor: Color.primary700,
        borderWidth: 3,
        borderRadius: 10,
        justifyContent: 'space-between',
        backgroundColor: Color.primary500,
        width: '100%',
        padding: 8,
        marginVertical: 8,
        elevation: 4,

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    itemText: {
        fontFamily: 'open-sans',
        fontSize: 16,
    }
});