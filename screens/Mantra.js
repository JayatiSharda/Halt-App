import {ScrollView, View, StyleSheet, Text, Pressable, Image, Modal } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from "../components/Menu";
import Tabs from '../components/Tabs';
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { useCallback, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons'; 
import ProgressBar from 'react-native-progress/Bar';
import { Audio } from 'expo-av';
import { useDispatch } from "react-redux";
import { setsound } from "../reducers/soundReducer";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';

export default function Mantra({navigation, route}){
    const[nextPage, setNextPage] = useState(false);
    const sound = useSelector((state) => state.sound.sound)
    const [modal, setModal] = useState(false);
    const scrollViewRef= useRef();
    const[chatCount, setChatCount] = useState(11);
    const[currentChatCount, setCurrentChatCount] = useState(0);

    const openModal = () => {
        setModal(true);
    }

    const [soundState, setSoundState] = useState();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const playMusic = async() => {
        const { sound } = await Audio.Sound.createAsync(require('../assets/audio/OmMantra.mp3'))
        setSoundState(sound)
        dispatch(setsound(sound));
        await sound.setIsLoopingAsync(true);
        await sound.playAsync();
    }

    useEffect(() => {
        if(!isFocused){
            exitChat()
        }
        return soundState ? () => soundState?.unloadAsync() : undefined
    }, [isFocused])



    const incrementChatCount = () => {
        if(currentChatCount < chatCount){
            setCurrentChatCount(currentChatCount + 1);
        }
        else if(chatCount == currentChatCount){
            openModal();
        }
    }

    const decrementChatCount = () => {
        if(currentChatCount > 0){
            setCurrentChatCount(currentChatCount - 1)
        }
    }

    const exitChat = () => {
        setChatCount(11);
        setModal(false);
        setCurrentChatCount(0);
        setNextPage(false);
        sound?.unloadAsync();
        dispatch(setsound(null))
    }

    const goToNextPage = () => {
        if(chatCount > 0){
            setNextPage(true)
            playMusic()
        }
    }
    return(
        <SafeAreaView style={{flex: 1}}>
            <Menu navigation={navigation}/>
            {!nextPage ?
            <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Chanting "Om" is like giving your mind a cozy, calming hug. It helps reduce stress, increases focus, and lets you tap into your inner chill mode. So, whenever life gets a bit crazy, just say "Om" and feel the good vibes flow. 😌🕉️</Text>
                </View>
                <Image style={styles.om} source={require("../assets/Om.png")}></Image>
                <View style={styles.bottomContainer}>
                    <Text style={styles.infoText}>How many times would you like to recite?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={chatCount===11 ? styles.counterButtonActive :styles.counterButton}><Text style={styles.infoText} onPress={() => {setChatCount(11)}}>11</Text></TouchableOpacity>
                        <TouchableOpacity style={chatCount===21 ? styles.counterButtonActive :styles.counterButton}><Text style={styles.infoText} onPress={() => {setChatCount(21)}}>21</Text></TouchableOpacity>
                        <TouchableOpacity style={chatCount===54 ? styles.counterButtonActive :styles.counterButton}><Text style={styles.infoText} onPress={() => {setChatCount(54)}}>54</Text></TouchableOpacity>
                    </View>
                    <Text style={styles.breakText}>OR</Text>
                    <TextInput style={styles.counterInput} placeholder="Specify a number" placeholderTextColor="#868686" onChangeText={setChatCount} keyboardType="numeric"/>
                    <TouchableOpacity style={styles.primaryButton} onPress={goToNextPage}><Text style={styles.primaryButtonText}>Let's Start!</Text></TouchableOpacity>
                </View>
               
                    <Text style={styles.breakText}>Adjust your volume accordingly</Text>
                
            </ScrollView>
            :
            <ScrollView style={styles.container} ref={scrollViewRef}>
                <Image source={require("../assets/sessionBG.png")} style={styles.playlistCoverImage}></Image>
                <Pressable onPress={() => scrollViewRef.current.scrollToEnd({animated: true})} style={{marginLeft: "auto", marginRight: "auto", marginTop: 10}}><Text style={{color: "#fff", textDecorationLine: "underline"}}>How does this screen works?👇</Text></Pressable>
                <View style={styles.chantCountSection}>
                    <ProgressBar progress={currentChatCount/chatCount} width={200} height={5} color="#EBEFFF" borderWidth={0} style={styles.chantCountSectionProgress}  />
                    <Text style={styles.chantCountSectionProgressText}>{currentChatCount+"/"+chatCount}</Text>
                </View>
                <View style={styles.musicButtonContainer}>
                    <TouchableOpacity onPress={() => {setCurrentChatCount(0)}}>
                        <MaterialIcons name="replay" size={35} color="#EBEFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playButton} onPress={incrementChatCount}>
                        <Text style={styles.playButtonText}>Tap here to count</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={decrementChatCount}>
                        <MaterialIcons name="fast-rewind" size={35} color="#EBEFFF" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.exitChantButton} onPress={exitChat}>
                    <MaterialIcons name="exit-to-app" size={24} color="black" />
                    <Text style={styles.exitChantButtonText}>Exit Chant</Text>
                </TouchableOpacity>
                <View style={styles.guideContainer}>
                    <Text style={styles.guideTitle}>How does this screen work?</Text>
                    <Text style={styles.guideLine}>1. Initially audio will take a few seconds to start😇</Text>
                    <Text style={styles.guideLine}>2. This screen works like a Japamala.</Text>
                 <Text style={styles.guideLine}>3. Recite with Om mantra aloud or in your mind and tap blue button above to count your recitation (recommended)</Text>
                    <Text style={styles.guideLine}>4. To decrease a recitation press on ⏪ icon.</Text>
                    <Text style={styles.guideLine}>5. Zen out and enjoy the vibe!</Text>
                </View>
                <Modal
                    animation={"slide"} transparent={true} visible={modal} 
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Text style={styles.modalHeader}>Namaste!</Text>
                            <Text style={styles.modalText}>You’ve completed your chant! Hope you’re as tranquil as the sea.</Text>
                            <Pressable style={styles.modalButton}><Text style={styles.modalButtonText} onPress={exitChat}>Exit</Text></Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            }
            <Tabs navigation={navigation} route={route}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1A1F33",
    },
    infoContainer: {
        margin: 25,
        padding: 15,
        backgroundColor: "#272C40",
        borderRadius: 10,
    },
    infoText: {
        color: "#EBEFFF",
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'Poppins_400Regular',
        lineHeight: 22
    },
    om:{
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
        width: 77,
        height: 57,
        objectFit: "contain"
    },
    bottomContainer: {
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 20,
    },
    counterButton: {
        flex: 0.3,
        padding: 10,
        backgroundColor: "#272C40",
        fontFamily: 'Poppins_400Regular',
    },
    counterButtonActive:{
        flex: 0.3,
        padding: 10,
        backgroundColor: "#7871FC",
        fontFamily: 'Poppins_400Regular',
    },
    counterInput: {
        flex: 1,
        width: "95%",
        padding: 10,
        color: "#EBEFFF",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#272C40",
        marginBottom: 20,
        fontFamily: 'Poppins_400Regular',
    },
    breakText: {
        marginBottom: 20,
        textAlign: "center",
        color: "#EBEFFF",
        fontFamily: 'Poppins_400Regular',
    },
    primaryButton: {
        flex: 1,
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: "#C59F1A",
        backgroundColor: "#272C40",
        borderWidth: 1.5,
        borderColor: "#C59F1A",
        shadowColor: '#000',
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 10,
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'Poppins_400Regular',
    },
    playlistCoverImage: {
        flex: 1,
        marginTop: 30,
        width: 330,
        marginLeft: "auto",
        marginRight: "auto",
        height: 330,
        objectFit: "contain"
    },
    musicButtonContainer: {
        flex: 1,
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    playButton: {
        width: 130,
        height: 130,
        borderRadius: 130,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7871FC"
    },
    playButtonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    exitChantButton: {
        width: 135,
        padding: 15,
        borderRadius: 40,
        backgroundColor: "#CBCFE0",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginLeft: "auto",
        marginRight: "auto",
        marginVertical: 15
    },
    exitChantButtonText: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    chantCountSection: {
        width: "70%",
        alignItems: 'center',
        justifyContent: "space-evenly",
        marginLeft: "auto",
        marginRight: "auto",
        marginVertical: 15,
        flexDirection: "row",
    },
    chantCountSectionProgress: {
        marginTop: 10,
        backgroundColor: "#868686"
    },
    chantCountSectionProgressText: {
        color: "#fff",
        marginTop: 10,
        fontFamily: 'Poppins_400Regular',
    },
    guideContainer: {
        flex: 1,
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        backgroundColor: "#272C40",
        padding: 20,
        marginBottom: 20,
        borderRadius: 20,
    },
    guideTitle: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular',
    },
    guideLine: {
        marginTop: 5,
        color: "#C59F1A",
        fontFamily: 'Poppins_400Regular',
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    modal: {
        width: "80%",
        backgroundColor: "#354173",
        padding: 25,
        borderRadius: 20,
    },
    modalText: {
        color: "#fff",
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular',
    },
    modalHeader: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular',
    },
    modalButton: {
        color: "#fff",
        marginTop: 8,
        marginLeft: "auto",
        marginRight: "auto"
    },
    modalButtonText: {
        color: "#C59F1A",
        fontFamily: 'Poppins_400Regular',
    },


})