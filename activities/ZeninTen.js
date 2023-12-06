import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function ZeninTen({navigation, route}){
    const {emotion} = route.params;
    const [startTimer, setStartTimer] = useState(false)
    const sound = useSelector((state) => state.sound.sound.current)
    const[key, setKey] = useState(0);
    
    const [isPauseMusic, setIsPauseMusic] = useState(true)

    const onFinishTask= () => {
        navigation.navigate("saveRecords", {emotion: emotion})
    }

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

    const restartTimer = () => {
        setKey(key + 1);
        setStartTimer(true);
    }

    const stopTimer = () => {
        setStartTimer(false);
        setKey(0);
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
                    <Text style={styles.subHeader}>Pause, Redirect and Focus</Text>
                    <Text style={styles.subsubHeader}>Let’s count till 1 from 10 and as you count, concentrate solely on the numbers and your breath.</Text>
                    <View style={styles.timerContainer}>
                        <CountdownCircleTimer
                            style={styles.timer}
                            key={key}
                            isPlaying={startTimer}
                            duration={30}
                            colors="#C59F1A"
                            onComplete={() => setStartTimer(false)}
                        >
                            {({ remainingTime }) => remainingTime % 3 === 0 ? <Text style={styles.timerText}>{remainingTime/3}</Text> : <Text style={styles.timerText}>{parseInt(remainingTime/3)+1}</Text> }
                        </CountdownCircleTimer>
                    </View>
                    {key===0 ? <><TouchableOpacity style={styles.startTimerButton} onPress={restartTimer}><Text>Start</Text></TouchableOpacity>
                    <Text style={styles.startTimerButtonHelp}>Press the button to start your countdown</Text></> :
                    <>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.restartTimerButton} onPress={restartTimer}><Text>Restart</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.stopTimerButton} onPress={stopTimer}><Text>Stop</Text></TouchableOpacity>
                    </View>
                    </>
                    }
                    <TouchableOpacity style={styles.primaryButton} onPress={onFinishTask}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity>
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
        marginTop: 15,
        marginBottom: 5,
        fontFamily: 'Poppins_400Regular',
    },
    subsubList: {
        fontSize: 16,
        color: "#C59F1A",
        marginTop: 5,
        marginBottom: 5,
        fontFamily: 'Poppins_400Regular',
    },
    subsubListDescription: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 15,
        fontFamily: 'Poppins_400Regular',
    },
    primaryButton: {
        width: 300,
        marginTop: 100,
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
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    timerContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    timerText: {
        color: "#fff",
        fontSize: 30,
        fontFamily: 'Poppins_400Regular',
    },
    startTimerButton: {
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: "#2FEB1F"
    },
    startTimerButtonHelp: {
        textAlign: "center",
        marginTop: 15,
        color: "#fff"
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    restartTimerButton: {
        textAlign: "center",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: "#CBCFE0",
        fontFamily: 'Poppins_400Regular',
    },
    stopTimerButton: {
        textAlign: "center",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: "#EF2E2E",
        fontFamily: 'Poppins_400Regular',
    }
})