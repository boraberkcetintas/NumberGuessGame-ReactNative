import { StyleSheet, View } from "react-native";
import Color from "../../constants/Color";

function Card({ children }) {
    return <View style={styles.inputContainer}>{children}</View>
}

export default Card;

const styles = StyleSheet.create({
    inputContainer: {
        padding: 8,
        margin:12,
        backgroundColor: Color.primary700,
        borderRadius: 8,
        elevation: 8,
        width:'80%',
        alignItems: 'center',

        shadowColor: 'black',
        shadowOffset: { x: 5, y: 5 },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
});