import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, SafeAreaView, Pressable, Image, View } from "react-native";
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from "react-redux";
import { setsound } from "../reducers/soundReducer";
import { TouchableOpacity } from "react-native";

export default function Playlist({navigation, route}){
    const sound = useSelector((state) => state.sound.sound)
    const {emotion} = route.params;
    const music = useRef()
    useEffect(() => {
        return () => {
            music ? () => music.current.unloadAsync() : undefined
            sound ? () => sound.current.unloadAsync() : undefined
        }
    }, [music])
    const dispatch = useDispatch();

    async function playMusic(audio) {
        if(music.current!=null){
            await music?.current?.pauseAsync()
            await sound?.current?.unloadAsync()
        }
            music.current = new Audio.Sound();
            try{
                await music.current.loadAsync(audio)
                await music.current.setIsLoopingAsync(true)
                await music.current.playAsync();
                dispatch(setsound(music))
            }
            catch(err){
                console.log(err)
            }
        navigation.navigate("activities", {emotion: emotion})
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.container}>
                <View style={{flex: 1, padding: 20}}>
                    <Text style={styles.subHeader}>Select the surrounding you want to be in...</Text>
                    <Text style={styles.paragraph}>Adjust the volume for best experience</Text>
                    <View style={styles.playListContainer}>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic(require("../assets/audio/CosmicSea.mp3"))} >
                            <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/>
                            <Text style={styles.musicName}>Cosmic Sea</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic(require('../assets/audio/EnergeticChirps.mp3'))}>
                            <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/>
                            <Text style={styles.musicName}>Energetic Chirps</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic(require("../assets/audio/InLibrary.mp3"))} >
                            <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/>
                            <Text style={styles.musicName}>In Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic(require('../assets/audio/LiquidMind.mp3'))}>
                            <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/>
                            <Text style={styles.musicName}>Liquid Mind</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic(require("../assets/audio/MoltenMagic.mp3"))} >
                            <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/>
                            <Text style={styles.musicName}>Molten Magic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic(require('../assets/audio/NightBreeze.mp3'))}>
                            <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/>
                            <Text style={styles.musicName}>Night Breeze</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic(require("../assets/audio/ocean.mp3"))} >
                            <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/>
                            <Text style={styles.musicName}>Serene Waves</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic(require('../assets/audio/SkyBlueDroplets.mp3'))}>
                            <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/>
                            <Text style={styles.musicName}>Sky Blue Droplets</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic(require("../assets/audio/TimeTravel.mp3"))} >
                            <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/>
                            <Text style={styles.musicName}>Time Travel</Text>
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

    paragraph: {
        fontSize: 14,
        color: "#C59F1A",
        marginTop: 5,
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular',

    },

    playListContainer: {
        flex: 1,
    },
    musicContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomColor: "#D1D1D1"
    },
    musicName: {
        color: "#fff",
        marginLeft: 10,
        fontFamily: 'Poppins_400Regular',
    },
    musicImage: {
        width: 50,
        height: 50,
        objectFit: "contain"
    }
})