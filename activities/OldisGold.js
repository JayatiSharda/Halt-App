import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { FontAwesome5 } from '@expo/vector-icons'; 
import axios from "axios";

export default function OldisGold({navigation, route}){
    const {emotion} = route.params
    const API_KEY = "GIHHILMPU7OGYv1Etg4ZCw==t3vdFUVtZkQqvIgy"
    const [historyInput, setHistoryInput] = useState("");
    const [result, setResult] = useState(null);
    const [resultMode, setResultMode] = useState(false)
    const sound = useSelector((state) => state.sound.sound.current)
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

    const searchHistory = () => {
        if(historyInput!=="" || historyInput.trim()!==""){
            setResult([]);
            axios.get("https://api.api-ninjas.com/v1/historicalevents?text="+historyInput ,{
                headers: {
                    'X-Api-Key': API_KEY
                }
            }).then((res) => {
                setResultMode(true)
                res?.data.map((data) => {
                    setResult(result => [...result, data])
                })
            })
            setHistoryInput("");
        }
    }

    const naviagetToHome = () => {
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
                    <Text style={styles.subHeader}>Engage Your Senses!</Text>
                    <Text style={styles.subsubHeader}>Instructions</Text>
                    <Text style={styles.subList}>1. Search normally about any Historic event or famous figure that interests you.</Text>
                    <Text style={styles.subList}>2. Read and explore multiple sources to gain a comprehensive understanding.</Text>
                    <Text style={styles.subList}>3. Enjoy the journey through history and beat boredom with fascinating discoveries!</Text>
                    <View style={styles.searchBox}>
                        <TextInput style={styles.searchInput} value={historyInput} onChangeText={setHistoryInput}/>
                        <Pressable style={styles.searchButton} onPress={searchHistory}><FontAwesome5 name="search" size={24} color="white" /></Pressable>
                    </View>
                    {result?.length > 0 ?
                    <View style={styles.searchResultContainer}>
                        {result?.map((res, key) => (
                        <View style={styles.resultBox} key={key}>
                            <Text style={styles.resultDate}>{res?.day+"-"+res?.month+"-"+res?.year}</Text>
                            <Text style={styles.resultText}>{res?.event}</Text>
                        </View>))
                        }
                    </View>: <></>}
                    {resultMode && result.length === 0 ? <Text style={styles.resultError}>No Result found!</Text> : <></>}
                    <TouchableOpacity style={styles.primaryButton} onPress={naviagetToHome}>
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
        justifyContent: "space-between",
        fontFamily: 'Poppins_400Regular',
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
        fontSize: 12,
        color: "#fff",
        marginTop: 5,
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular',
    },
    subList: {
        fontSize: 14,
        color: "#fff",
        marginTop: 3,
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
    searchBox: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C59F1A",
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 10,
        overflow: "hidden"
    },
    searchInput: {
        flex: 0.8,
        padding: 12,
        backgroundColor: "#fff",
        fontFamily: 'Poppins_400Regular',
    },
    searchButton: {
        flex: 0.2,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#C59F1A"
    },
    searchResultContainer: {
        flex: 1,
    },
    resultBox: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 10,
        fontFamily: 'Poppins_400Regular',
    },
    resultDate: {
        fontSize: 12,
        marginBottom: 5
    },
    resultError: {
        color: "#f00",
        marginLeft: 5,
    }
})