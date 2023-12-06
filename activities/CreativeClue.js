import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import axios from "axios";

export default function CreativeClue({navigation, route}){
    const {emotion} = route.params;
    const sound = useSelector((state) => state.sound.sound.current)
    const [riddle, setRiddle] = useState(null);
    const [showRiddleAnswer, setShowRiddleAnswer] = useState(false)
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
    const createRiddle = () => {
        setShowRiddleAnswer(false);
        axios.get('https://api.api-ninjas.com/v1/riddles', {headers: {'X-Api-Key': API_KEY}}).then((res) => {
            setRiddle(res?.data[0])
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
                    <Text style={styles.subHeader}>Ready to unravel the mystery?</Text>
                    <Text style={styles.subsubHeader}>Click for a riddle, then click again for the 'Aha!' moment.</Text>
                    <TouchableOpacity style={styles.secondaryButton} onPress={createRiddle}><Text style={styles.secondaryButtonText}>Riddle Me This</Text></TouchableOpacity>
                    {riddle!==null ? 
                    <>
                    <Text style={styles.helpText}>For another one you can always click on riddle!</Text>
                    <View style={styles.riddleContainer}>
                        <Text style={styles.riddleText}>{riddle?.question}</Text>
                    </View>
                    {!showRiddleAnswer ?
                    <TouchableOpacity style={styles.primaryButton} onPress={() => setShowRiddleAnswer(true)}><Text style={styles.primaryButtonText}>Let's see if your answer matches!</Text></TouchableOpacity> :
                    <>
                    <Text style={styles.riddleAnswer}>{riddle?.answer}</Text>
                    <TouchableOpacity style={styles.primaryButton} onPress={onFinishTask}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity>
                    </>}
                    </>:<></>
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
        marginBottom: 10,
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
    helpText: {
        marginTop: 20,
        color: "#868686",
        textAlign: "center",
        fontFamily: 'Poppins_400Regular',
    },
    riddleContainer: {
        backgroundColor: "#424663",
        padding: 15,
        borderRadius: 10,
    },
    riddleText: {
        color: "#fff",
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        lineHeight: 21
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 14
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
    riddleAnswer: {
        marginTop: 20,
        borderRadius: 10,
        padding: 15,
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: 'Poppins_400Regular',
    }
})