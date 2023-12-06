import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import axios from "axios";

export default function HumourMe({navigation, route}){
    const {emotion} = route.params;
    const sound = useSelector((state) => state.sound.sound.current)
    const [joke, setJoke] = useState(null);
    const [hitMiss, setHitMiss] = useState("");
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
    const createJoke = () => {
        axios.get('https://api.api-ninjas.com/v1/dadjokes?limit=1', {headers: {'X-Api-Key': API_KEY}}).then((res) => {
            setJoke(res?.data[0]?.joke)
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
                    <Text style={styles.subHeader}>Laugh Your Hurts Away: Dad Joke Delight!</Text>
                    <Text style={styles.subsubHeader}>Follow the steps below:</Text>
                    <Text style={styles.subsubHeader}>1. Click to serve up a hilarious dad joke to tickle your funny bone</Text>
                    <TouchableOpacity style={styles.secondaryButton} onPress={createJoke}><Text style={styles.secondaryButtonText}>Humour Me!</Text></TouchableOpacity>
                    {joke!==null ? 
                    <>
                    <View style={styles.riddleContainer}>
                        <Text style={styles.riddleText}>{joke}</Text>
                    </View>
                    <View style={styles.hitMissContainer}>
                        <Text style={styles.subsubHeader}>2. Was it a hit or a miss?</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: 10, marginBottom: 20}}>
                            <Pressable style={styles.button} onPress={() =>setHitMiss("hit")}><Image style={styles.buttonIcon} source={require('../assets/sentiment_neutral.png')}/></Pressable>
                            <Pressable style={styles.button} onPress={() => setHitMiss("miss")}><Image style={styles.buttonIcon} source={require('../assets/sentiment_very_satisfied.png')}/></Pressable>
                        </View>
                    </View>
                    {hitMiss !== "" ?
                    <TouchableOpacity style={styles.primaryButton} onPress={onFinishTask}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity> : <></>}
                    </> : <></>}
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
        marginTop: 15,
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
    riddleAnswer: {
        marginTop: 20,
        borderRadius: 10,
        padding: 15,
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: 'Poppins_400Regular',
    },
    hitMissContainer: {
        flex: 1,
        marginTop: 20,
    },
    button: {
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "#354173",
        shadowColor: '#00',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 15,
        fontFamily: 'Poppins_400Regular',
    },
    buttonIcon: {
        width: 70,
        height: 70,
        objectFit: "contain"
    }
})