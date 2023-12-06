import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function ComfortCorner({navigation, route}){
    const {emotion} = route.params;
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
    const onFinishTask= () => {
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
                    <Text style={styles.subHeader}>Just follow 3 Es for a better mood!</Text>
                    <Text style={styles.subsubHeader}>Follow the steps below:</Text>
                    <Text style={styles.subsubList}>1. Explore Your Space:</Text>
                    <Text style={styles.subsubListDescription}>Look around for something matching our daily theme</Text>
                    <Text style={styles.subsubList}>2. Engage Your Senses:</Text>
                    <Text style={styles.subsubListDescription}>Close your eyes and feel the moment. What do you sense?</Text>
                    <Text style={styles.subsubList}>3. Embrace Positive Vibes:</Text>
                    <Text style={styles.subsubListDescription}>Let the emotions of gratitude fill you up</Text>
                    
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
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
})