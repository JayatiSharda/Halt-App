import { useState } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native";

export default function EmotionsList({navigation}){
    const [emotionList, setEmotionList] = useState(["Bored", "Lonely", "Hurt", "Angry", "Confused", "Fear", "Remorse", "Inadequate", "Depressed"]);
    
    function navigateToEmotionsMeter(key) {
        navigation.navigate("emotionsMeter", {emotion: emotionList[key]});
    }

    return(
        <SafeAreaView style={{flex: 1}} keyboardShouldPersistTaps={true} >
            <ScrollView style={styles.container}>
                <View style={{flex: 1, padding: 20}}>
                    <Text style={styles.subHeader}>Which mood are you feeling?</Text>
                    <View style={styles.emotionsListContainer}>
                        <TouchableOpacity style={styles.emotionContainer} onPress={() => navigateToEmotionsMeter(0)}>
                            <Image source={require('../assets/Bored.png')} style={styles.emotionImage}/>
                            <Text style={styles.emotionText}>{emotionList[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.emotionContainer} onPress={() => navigateToEmotionsMeter(5)}>
                            <Image source={require('../assets/Fear.png')} style={styles.emotionImage}/>
                            <Text style={styles.emotionText}>{emotionList[5]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emotionsListContainer}>
                        <TouchableOpacity style={styles.emotionContainer} onPress={() => navigateToEmotionsMeter(2)}>
                            <Image source={require('../assets/Hurt.png')} style={styles.emotionImage}/>
                            <Text style={styles.emotionText}>{emotionList[2]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.emotionContainer} onPress={() => navigateToEmotionsMeter(3)}>
                            <Image source={require('../assets/Angry.png')} style={styles.emotionImage}/>
                            <Text style={styles.emotionText}>{emotionList[3]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emotionsListContainer}>
                        <TouchableOpacity style={styles.emotionContainer} onPress={() => navigateToEmotionsMeter(4)}>
                            <Image source={require('../assets/Confused.png')} style={styles.emotionImage}/>
                            <Text style={styles.emotionText}>{emotionList[4]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emotionsListContainer}>
                        <TouchableOpacity style={styles.emotionContainerHide}>
                            <Image source={require('../assets/Remorse.png')} style={styles.emotionImage}/>
                            <Text style={styles.emotionTextHide}>{emotionList[6]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.emotionContainerHide}>
                            <Image source={require('../assets/Inadequate.png')} style={styles.emotionImage}/>
                            <Text style={styles.emotionTextHide}>{emotionList[7]}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emotionsListContainer}>
                        <TouchableOpacity style={styles.emotionContainerHide} onPress={() => null}>
                            <Image source={require('../assets/Lonely.png')} style={styles.emotionImage}/>
                            <Text style={styles.emotionTextHide}>{emotionList[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.emotionContainerHide} onPress={() => null}>
                            <Image source={require('../assets/Depressed.png')} style={styles.emotionImage}/>
                            <Text style={styles.emotionTextHide}>{emotionList[8]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1A1F33",
    },
    subHeader: {
        fontSize: 18,
        color: "#fff",
        marginTop: 5,
        marginBottom: 10,
        marginBottom: 25,
        fontFamily: 'Poppins_400Regular',
    },
    emotionsListContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 18,
    },
    emotionContainer: {
        flex: 0.47,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#EBEFFF",
        borderRadius: 10,
    },
    emotionContainerHide: {
        flex: 0.47,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#868686",
        borderRadius: 10,
    },
    emotionImage: {
        flex: 1,
        width: 80,
        height: 80,
        objectFit: "contain"
    },
    emotionText: {
        color: "#fff",
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular',
    },
    emotionTextHide: {
        color: "#868686",
        fontFamily: 'Poppins_400Regular',
    }
})