import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import axios from "axios";

export default function ClarityQuest({navigation, route}){
    const {emotion} = route.params;
    const sound = useSelector((state) => state.sound.sound.current)
    const [word, setWord] = useState("");
    const [answer1, setAnswer1] = useState(null);
    const [answer2, setAnswer2] = useState(null);
    const API_KEY = "GIHHILMPU7OGYv1Etg4ZCw==t3vdFUVtZkQqvIgy"
    
    const [isPauseMusic, setIsPauseMusic] = useState(true)
    const onPlayPauseMusic = () => {
        if(isPauseMusic){
            sound.stopAsync();
            setIsPauseMusic(!isPauseMusic);
        }
        else{
            sound.playAsync();
            setIsPauseMusic(!isPauseMusic);
        }
    }
    const onFinishTask= () => {
        navigation.navigate("saveRecords", {emotion: emotion})
    }
    const getRandomWord = () => {
        setWord(null);
        setAnswer1(null)
        setAnswer2(null)
        axios.get('https://api.api-ninjas.com/v1/randomword', {headers: {'X-Api-Key': API_KEY}}).then((res) => {
            setWord(res?.data?.word)
        })
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
                <View style={{flex: 1, padding: 20}}>
                    <View style={styles.activityHeaderContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image style={styles.backButtonImage} source={require("../assets/arrow_back.png")}/>
                        </Pressable>
                        <Pressable onPress={onPlayPauseMusic}>
                           {isPauseMusic ? <Image style={styles.musicPlayPauseImage} source={require("../assets/playMusic.png")}/> : <Image style={styles.musicPlayPauseImage} source={require("../assets/pauseMusic.png")}/> } 
                        </Pressable>
                    </View>
                    <Text style={styles.subHeader}>Here you can create your own story using just a random word!</Text>
                    <Text style={styles.subsubHeader}>Follow the steps below:</Text>
                    <Text style={styles.subsubHeader}>1. Click to receive a random image</Text>
                    <TextInput style={styles.activityTextArea} editable={false} value={word}/>
                    <TouchableOpacity style={styles.secondaryButton} onPress={getRandomWord}><Text style={styles.secondaryButtonText}>Click for word!</Text></TouchableOpacity>
                    {word!=="" ?
                    <>
                    <Text style={styles.subsubHeader}>2. Write down list of words that come to your mind after reading the word</Text>
                    <TextInput placeholder="type" multiline numberOfLines={4} onChangeText={setAnswer1} style={styles.activityTextArea}/>
                    <Text style={styles.subsubHeader}>Write/visualise a short story using the words. Don't worry about finding the "perfect" answer; the goal is to break through mental roadblocks.</Text>
                    <TextInput placeholder="type" multiline numberOfLines={4} onChangeText={setAnswer2} style={styles.activityTextArea}/>
                    {answer1!==null && answer2!==null?
                    <TouchableOpacity style={styles.primaryButton} onPress={onFinishTask}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity>
                    :<></>}
                    </>: <></>
                    }
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
    activityHeaderContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    backButtonImage: {
        width: 50,
        height: 50,
        objectFit: "contain"
    },
    musicPlayPauseImage: {
        width: 60,
        height: 60,
        objectFit: "contain"
    },
    subHeader: {
        fontSize: 18,
        color: "#868686",
        marginTop: 5,
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular',
    },
    subsubHeader: {
        fontSize: 14,
        color: "#fff",
        marginTop: 5,
        fontFamily: 'Poppins_400Regular',
    },
    primaryButton: {
        width: 300,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        height: 50,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "#272C40",
        borderWidth: 1,
        borderColor: "#C59F1A",
        shadowColor: '#000',
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        marginTop: 15,
        width: "100%",
        height: 200,
        marginBottom: 15,
        objectFit: "contain"
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    secondaryButton: {
        width: 200,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        height: 50,
        borderRadius: 30,
        marginBottom: 10,
        backgroundColor: "#CBCFE0",
        fontFamily: 'Poppins_400Regular',
        alignItems: "center",
        justifyContent: "center"
    },
    secondaryButtonText: {
        color: "#000",
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    activityTextArea: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        alignItems: "flex-start",
        textAlignVertical:'top',
        fontFamily: 'Poppins_400Regular',
    },
})