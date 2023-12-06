import * as React from 'react';
import {useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from "react-redux";
import { setsound } from "../reducers/soundReducer";
import Menu from "../components/Menu";
import Tabs from "../components/Tabs";
import { useFocusEffect } from '@react-navigation/native';

export default function Ambiences({navigation, route}){
    const[music, setMusic] = useState(null)
    useEffect(() => {
        return music ? () => music.unloadAsync() : undefined
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            return music ? () => 
                {
                    music.unloadAsync()
                    setPlayer({
                        music1: false,
                        music2: false,
                        music3: false,
                        music4: false,
                        music5: false,
                        music6: false,
                        music7: false,
                        music8: false,
                        music9: false,
                    })
                    setMusic(null)
                } : undefined
        }, [music])
    )
    const [player, setPlayer] = useState({
        music1: false,
        music2: false,
        music3: false,
        music4: false,
        music5: false,
        music6: false,
        music7: false,
        music8: false,
        music9: false,
    })
    async function playMusic1(audio) {
        if(music!=null){
            await music.pauseAsync()
        }
        if(!player.music1){
            let sound = new Audio.Sound();
            try{
                await sound.loadAsync(audio)
                await sound.setIsLoopingAsync(true)
                await sound.playAsync();
                setMusic(sound)
            }
            catch(err){
                console.log(err)
            }
        }
        setPlayer({
            music1: !player.music1,
            music2: false,
            music3: false,
            music4: false,
            music5: false,
            music6: false,
            music7: false,
            music8: false,
            music9: false,
        })
    }
    async function playMusic2(audio) {
        if(music!=null){
            await music.pauseAsync()
        }
        if(!player.music2){
            let sound = new Audio.Sound();
            try{
                await sound.loadAsync(audio)
                await sound.setIsLoopingAsync(true)
                await sound.playAsync();
                setMusic(sound)
            }
            catch(err){
                console.log(err)
            }
        }
        setPlayer({
            music1: false,
            music2: !player.music2,
            music3: false,
            music4: false,
            music5: false,
            music6: false,
            music7: false,
            music8: false,
            music9: false,
        })
    }
    async function playMusic3(audio) {
        if(music!=null){
            await music.pauseAsync()
        }
        if(!player.music3){
            let sound = new Audio.Sound();
            try{
                await sound.loadAsync(audio)
                await sound.setIsLoopingAsync(true)
                await sound.playAsync();
                setMusic(sound)
            }
            catch(err){
                console.log(err)
            }
        }
        setPlayer({
            music1: false,
            music2: false,
            music3: !player.music3,
            music4: false,
            music5: false,
            music6: false,
            music7: false,
            music8: false,
            music9: false,
        })
    }
    async function playMusic4(audio) {
        if(music!=null){
            await music.pauseAsync()
        }
        if(!player.music4){
            let sound = new Audio.Sound();
            try{
                await sound.loadAsync(audio)
                await sound.setIsLoopingAsync(true)
                await sound.playAsync();
                setMusic(sound)
            }
            catch(err){
                console.log(err)
            }
        }
        setPlayer({
            music1: false,
            music2: false,
            music3: false,
            music4: !player.music4,
            music5: false,
            music6: false,
            music7: false,
            music8: false,
            music9: false,
        })
    }
    async function playMusic5(audio) {
        if(music!=null){
            await music.pauseAsync()
        }
        if(!player.music5){
            let sound = new Audio.Sound();
            try{
                await sound.loadAsync(audio)
                await sound.setIsLoopingAsync(true)
                await sound.playAsync();
                setMusic(sound)
            }
            catch(err){
                console.log(err)
            }
        }
        setPlayer({
            music1: false,
            music2: false,
            music3: false,
            music4: false,
            music5: !player.music5,
            music6: false,
            music7: false,
            music8: false,
            music9: false,
        })
    }
    async function playMusic6(audio) {
        if(music!=null){
            await music.pauseAsync()
        }
        if(!player.music6){
            let sound = new Audio.Sound();
            try{
                await sound.loadAsync(audio)
                await sound.setIsLoopingAsync(true)
                await sound.playAsync();
                setMusic(sound)
            }
            catch(err){
                console.log(err)
            }
        }
        setPlayer({
            music1: false,
            music2: false,
            music3: false,
            music4: false,
            music5: false,
            music6: !player.music6,
            music7: false,
            music8: false,
            music9: false,
        })
    }
    async function playMusic7(audio) {
        if(music!=null){
            await music.pauseAsync()
        }
        if(!player.music7){
            let sound = new Audio.Sound();
            try{
                await sound.loadAsync(audio)
                await sound.setIsLoopingAsync(true)
                await sound.playAsync();
                setMusic(sound)
            }
            catch(err){
                console.log(err)
            }
        }
        setPlayer({
            music1: false,
            music2: false,
            music3: false,
            music4: false,
            music5: false,
            music6: false,
            music7: !player.music7,
            music8: false,
            music9: false,
        })
    }
    async function playMusic8(audio) {
        if(music!=null){
            await music.pauseAsync()
        }
        if(!player.music8){
            let sound = new Audio.Sound();
            try{
                await sound.loadAsync(audio)
                await sound.setIsLoopingAsync(true)
                await sound.playAsync();
                setMusic(sound)
            }
            catch(err){
                console.log(err)
            }
        }
        setPlayer({
            music1: false,
            music2: false,
            music3: false,
            music4: false,
            music5: false,
            music6: false,
            music7: false,
            music8: !player.music8,
            music9: false,
        })
    }
    async function playMusic9(audio) {
        if(music!=null){
            await music.pauseAsync()
        }
        if(!player.music9){
            let sound = new Audio.Sound();
            try{
                await sound.loadAsync(audio)
                await sound.setIsLoopingAsync(true)
                await sound.playAsync();
                setMusic(sound)
            }
            catch(err){
                console.log(err)
            }
        }
        setPlayer({
            music1: false,
            music2: false,
            music3: false,
            music4: false,
            music5: false,
            music6: false,
            music7: false,
            music8: false,
            music9: !player.music9,
        })
    }
    return(
        <SafeAreaView style={{flex: 1}}>
            <Menu navigation={navigation}/>
            <ScrollView style={styles.container}>
                <View style={styles.ambienceHeader}>
                    <Text style={styles.title}>All Soundscape tracks</Text>
                    <Text style={styles.subTitle}>Adjust the sound as desired</Text>
                </View>
                <View style={{flex: 1, padding: 20}}>
                    <View style={styles.playListContainer}>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic1(require("../assets/audio/ocean.mp3"))} >
                            {player.music1 ? <Image style={styles.musicImage} source={require("../assets/pause_circle.png")}/> : <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/> } 
                            <Text style={styles.musicName}>Cosmic Sea</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic2(require('../assets/audio/EnergeticChirps.mp3'))}>
                            {player.music2 ? <Image style={styles.musicImage} source={require("../assets/pause_circle.png")}/> : <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/> }
                            <Text style={styles.musicName}>Energetic Chirps</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic3(require('../assets/audio/InLibrary.mp3'))}>
                            {player.music3 ? <Image style={styles.musicImage} source={require("../assets/pause_circle.png")}/> : <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/> }
                            <Text style={styles.musicName}>In Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic4(require('../assets/audio/LiquidMind.mp3'))}>
                            {player.music4 ? <Image style={styles.musicImage} source={require("../assets/pause_circle.png")}/> : <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/> }
                            <Text style={styles.musicName}>Liquid Mind</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic5(require('../assets/audio/MoltenMagic.mp3'))}>
                            {player.music5 ? <Image style={styles.musicImage} source={require("../assets/pause_circle.png")}/> : <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/> }
                            <Text style={styles.musicName}>Molten Magic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic6(require('../assets/audio/NightBreeze.mp3'))}>
                            {player.music6 ? <Image style={styles.musicImage} source={require("../assets/pause_circle.png")}/> : <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/> }
                            <Text style={styles.musicName}>Night Breeze</Text>   
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic7(require('../assets/audio/SereneWaves.mp3'))}>
                            {player.music7 ? <Image style={styles.musicImage} source={require("../assets/pause_circle.png")}/> : <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/> }
                            <Text style={styles.musicName}>Serene Waves</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic8(require('../assets/audio/SkyBlueDroplets.mp3'))}>
                            {player.music8 ? <Image style={styles.musicImage} source={require("../assets/pause_circle.png")}/> : <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/> }
                            <Text style={styles.musicName}>Sky Blue Droplets</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.musicContainer} onPress={() => playMusic9(require('../assets/audio/TimeTravel.mp3'))}>
                            {player.music9 ? <Image style={styles.musicImage} source={require("../assets/pause_circle.png")}/> : <Image style={styles.musicImage} source={require("../assets/play_circle.png")}/> }
                            <Text style={styles.musicName}>Time Travel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Tabs navigation={navigation} route={route} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
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
    playListContainer: {
        flex: 1,
    },
    musicContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
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
    },
    ambienceHeader: {
        flex: 1,
        padding: 30,
        paddingVertical: 40,
        backgroundColor: "#354173"
    },
    title: {
        fontSize: 20,
        color: "#EBEFFF",
        fontFamily: 'Poppins_400Regular',
    },
    subTitle: {
        fontSize: 12,
        color: "#EBEFFF",
        fontFamily: 'Poppins_400Regular',
    }
})