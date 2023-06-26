
import { View, Text, StyleSheet, Pressable } from "react-native";
import Color from "../../constants/Color";

function PrimaryButton({ children, onPress }) {
    return (
        <View style={styles.outerButtonContainer}>
            <Pressable
                onPress={onPress}
                style={
                    ({pressed}) =>
                        pressed
                        ? [styles.innerButtonContainer, styles.pressed]
                        : styles.innerButtonContainer
                }
                android_ripple={{ color: Color.primary650 }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    outerButtonContainer: {
        margin: 8,
        overflow: 'hidden',
        borderRadius: 28,
    },
    innerButtonContainer: {
        backgroundColor: Color.primary600,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 4,
    },
    buttonText: {
        fontFamily:'open-sans',
        textAlign: 'center',
        justifyContent:'center',
        fontSize: 20,
        color: 'white'
    },
    pressed: {
        opacity: 0.85
    }
});

export default PrimaryButton;