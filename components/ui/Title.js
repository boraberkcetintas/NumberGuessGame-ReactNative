import { Text, StyleSheet } from "react-native";

function Title({ children }) {
    return (
        <Text style={styles.title}>{children}</Text>
    );
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontFamily: 'open-sans-bold',
        textAlign: "center",
        color: 'white',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius:8,
        padding: 16,
        maxWidth:'80%',
    }
});