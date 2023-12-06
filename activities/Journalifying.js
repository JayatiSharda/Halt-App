import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";

export default function Journalifying({navigation, route}){
    const {emotion} = route.params;
    const timerRef = useRef();
    const sound = useSelector((state) => state.sound.sound.current)
    const [journalText, setJournalText] = useState("");
    const [time, setTime] = useState("01 : 00");
    const [timer, setTimer] = useState(60);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
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

    const onStartTimer = () => {
        countdown = 60;
        if(!isTimerStarted){
            const timerInterval = setInterval(() => {
                if(countdown > 0){
                    setTimer(timer => timer - 1);
                    countdown -= 1
                    if(countdown > 10)
                    setTime("00" + " : " + countdown);
                    else
                    setTime("00" + " : 0" + countdown);
                }
                else{
                    clearInterval(timerInterval)
                    timerRef.current.setNativeProps({
                        width: "0",
                        flex: 0
                    })
                    setTime("")
                }
            },1000)
        }
    }

    const onFinishJournal= () => {
        navigation.navigate("saveRecords", {emotion: emotion})
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
                    <Text style={styles.subHeader}>Reflect and Reset: Write a one Minute Journal</Text>
                    <Text style={styles.subsubHeader}>Use the timer which can improve mindfulness and self-awareness (optional)</Text>
                    <Pressable style={styles.timer} onPress={onStartTimer}>
                        <Text style={styles.time} ref={timerRef}>{time}</Text>
                        <FontAwesome5 name="clock" size={20} color="white" style={styles.timeIcon} />
                    </Pressable>
                    <TextInput placeholder="type..." style={styles.textInputJournal} multiline={true} numberOfLines={35} onChangeText={setJournalText}></TextInput>
                    {journalText.length !== 0 ?
                    <TouchableOpacity style={styles.primaryButton} onPress={onFinishJournal}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity>
                    :<></>}
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
        fontSize: 16,
        color: "#868686",
        marginTop: 5,
        marginBottom: 25,
        fontFamily: 'Poppins_400Regular',
    },
    timer: {
        height: 60,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#C59F1A",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 70,
        fontFamily: 'Poppins_400Regular',
    },
    time: {
        flex: 0.30,
        height: "100%",
        borderRadius: 70,
        textAlign: "center",
        backgroundColor: "#fff",
        paddingTop: 18,
        fontFamily: 'Poppins_400Regular',
    },
    timeIcon: {
        flex: 0.25,
        textAlign: "center",
    },
    textInputJournal: {
        margin: 7,
        marginTop: 25,
        padding: 15,
        backgroundColor: "#D9D9D9",
        height: 350,
        textAlignVertical: "top",
        borderRadius: 10,
        fontFamily: 'Poppins_400Regular',
    },
    primaryButton: {
        width: 130,
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
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
})