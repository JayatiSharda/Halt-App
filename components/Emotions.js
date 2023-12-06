import { View, StyleSheet, Pressable, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from "react";

export default function Emotions({onSelectEmotionsMeter}){
    const [emotion1, setEmotion1] = useState(false);
    const [emotion2, setEmotion2] = useState(false);
    const [emotion3, setEmotion3] = useState(false);

    const [emotion1Text, setEmotion1Text] = useState("Light");
    const [emotion2Text, setEmotion2Text] = useState("Intermediate");
    const [emotion3Text, setEmotion3Text] = useState("Strong")

    const changeEmotion1Style = () => {
        setEmotion1(true);
        setEmotion2(false);
        setEmotion3(false);
        onSelectEmotionsMeter(emotion1Text);
    }

    const changeEmotion2Style = () => {
        setEmotion1(false);
        setEmotion2(true);
        setEmotion3(false);
        onSelectEmotionsMeter(emotion2Text);
    }

    const changeEmotion3Style = () => {
        setEmotion1(false);
        setEmotion2(false);
        setEmotion3(true);
        onSelectEmotionsMeter(emotion3Text);
    }
    return(
        <View style={styles.container}>
            <Pressable style={styles.emotionContainer} onPress={changeEmotion1Style}>
                <FontAwesome5 name={'meh'} style={!emotion1 ? styles.emotion : styles.emotionActive} />
                <Text style={!emotion1 ? styles.emotionText : styles.emotionActiveText}>{"Mild"}</Text>
            </Pressable>
            <Pressable style={styles.emotionContainer} onPress={changeEmotion2Style}>
                <FontAwesome5 name={'frown'} style={!emotion2 ? styles.emotion : styles.emotionActive} />
                <Text style={!emotion2 ? styles.emotionText : styles.emotionActiveText}>{"Moderate"}</Text>
            </Pressable>
            <Pressable style={styles.emotionContainer} onPress={changeEmotion3Style}>
                <FontAwesome5 name={'angry'} style={!emotion3 ? styles.emotion : styles.emotionActive} />
                <Text style={!emotion3 ? styles.emotionText : styles.emotionActiveText}>{"Severe"}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1A1F33",
        backgroundColor: "#354173",
        borderRadius: 20,
        padding: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 60,
        paddingBottom: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    emotionContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emotion: {
        flex: 1,
        fontSize: 35,
        color: "#868686"
    },
    emotionText: {
        flex: 1,
        marginTop: 5,
        fontSize: 12,
        color: "#868686",
        fontFamily: 'Poppins_400Regular',
    },
    emotionActive: {
        flex: 1,
        fontSize: 45,
        color: "#C59F1A",
    },
    emotionActiveText: {
        flex: 1,
        marginTop: 5,
        fontSize: 12,
        fontSize: 16,
        color: "#C59F1A",
        fontFamily: 'Poppins_400Regular',
    },
})