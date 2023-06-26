import { View, StyleSheet, Text, Dimensions } from "react-native";
import Color from "../../constants/Color";

function NumberContainer({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    );
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Color.primary600,
        padding: 24,
        borderRadius: 8,
        margin: deviceWidth < 350 ? 12 : 24,
        alignItems: "center",
        justifyContent: 'center',
        width: '75%'
    },
    numberText: {
        fontFamily:'open-sans-bold',
        color: Color.primary600,
        fontSize: 32,
    }
});