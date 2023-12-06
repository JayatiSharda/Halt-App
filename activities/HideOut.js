import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { LogBox } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import {Picker} from '@react-native-picker/picker';

export default function HideOut({navigation, route}){
    const {emotion} = route.params;
    const [open, setOpen] = useState(false);
    const [dropdDownValue, setDropDownValue] = useState(null);
    const [fear, setFear] = useState("");
    const [worst, setWorst] = useState("");
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

    const naviagetToHome = () => {
        navigation.navigate("saveRecords", {emotion: emotion})
    }

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

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
                    <Text style={styles.subHeader}>Acknowledge and reflect on the fear, consider its possible outcomes, and shift to a positive perspective.</Text>
                    <Text style={styles.subsubHeader}>Name your fear:</Text>
                    <TextInput placeholder="type..." style={styles.activityInput} onChangeText={setFear} />
                    <Text style={styles.subsubHeader}>What’s the worst that could happen?:</Text>
                    <TextInput placeholder="type..." style={styles.activityTextArea} multiline numberOfLines={4} onChangeText={setWorst} />
                    {worst!==null && fear!==null && worst!=="" && fear!=="" ?
                    <>
                    <Text style={styles.subsubHeader}>Choose a positive reflection:</Text>
                    <Picker
                    selectedValue={dropdDownValue}
                    numberOfLines={5}
                    style={styles.dropdown}
                    onValueChange={(itemValue, itemIndex) => {
                        if(itemValue!=="") {
                            setOpen(true);
                            setDropDownValue(itemValue)
                        }
                        else{
                            setDropDownValue(itemValue)
                            setOpen(false)
                        }
                    }}>
                    <Picker.Item label="What if..." value="" />
                    <Picker.Item label="What if I can learn and grow from this experience?" value="What if I can learn and grow from this experience?" />
                    <Picker.Item label="What if this fear is just a small part of my potential?" value="What if this fear is just a small part of my potential?" />
                    <Picker.Item label="What if facing this fear helps me become stronger and more confident?" value="What if facing this fear helps me become stronger and more confident?" />
                    </Picker>
                    </>:<></>}
                    {open ? 
                    <>
                        <Text style={styles.helpText}>Shifting your perspective can make a big difference.</Text>
                        <Image style={styles.helpImage} source={require('../assets/positiveAffirmation.png')} />
                        <TouchableOpacity style={styles.primaryButton} onPress={naviagetToHome}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                        </TouchableOpacity>
                    </> : <></>
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
        fontSize: 12,
        color: "#fff",
        marginTop: 5,
        marginBottom: 0,
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
    dropdown: {
        flex: 1,
        backgroundColor: "#FFF",
        fontSize: 10,
        fontFamily: 'Poppins_400Regular'
    },
    activityInput: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        alignItems: "flex-start",
        marginBottom: 20,
        fontFamily: 'Poppins_400Regular',
    },
    activityTextArea: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        alignItems: "flex-start",
        marginBottom: 20,
        textAlignVertical:'top',
        fontFamily: 'Poppins_400Regular',
    },
    helpText: {
        color: "#C59F1A",
        marginTop: 15,
        fontFamily: 'Poppins_400Regular',
    },
    helpImage: {
        width: "100%",
        height: 300,
        objectFit: "contain"
    }
})