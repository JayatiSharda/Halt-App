import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";

export default function SeeSenseHear({navigation, route}){
    const {emotion} = route.params;
    const sound = useSelector((state) => state.sound.sound.current)
    const [see, setSee] = useState([]);
    const [semse, setSense] = useState([]);
    const [hear, setHear] = useState([]);

    const [seeText, setSeeText] = useState("");
    const [senseText, setSenseText] = useState("");
    const [hearText, setHearText] = useState("");
    
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
        if(seeText.split("\n") !== undefined && senseText.split("\n") !== undefined && hearText.split("\n")!==undefined){
            setSee(seeText.split("\n"))
            setSense(senseText.split("\n"))
            setHear(hearText.split("\n"))
            navigation.navigate("saveRecords", {emotion: emotion})
        }
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
                    <Text style={styles.subList}>1. Focus on your surroundings.</Text>
                    <Text style={styles.subList}>2. Identify 3 things you can see.</Text>
                    <Text style={styles.subList}>3. Find 2 things you can touch.</Text>
                    <Text style={styles.subList}>4. Finally, listen for 1 thing you can hear.</Text>
                    <Text style={styles.subList}>5. Repeat this process for 30 seconds to 1 minute.</Text>
                    <Text style={styles.subList}>6. Engage your senses and enjoy the experience!</Text>
                    <Text style={styles.subList}>7. List them down for reflection later.</Text>
                    <Text style={styles.label}>See</Text>
                    <TextInput placeholder="type..." style={styles.textInputSenses} multiline={true} numberOfLines={3} onChangeText={setSeeText}></TextInput>
                    <Text style={styles.label}>Sense</Text>
                    <TextInput placeholder="type..." style={styles.textInputSenses} multiline={true} numberOfLines={3} onChangeText={setSenseText}></TextInput>
                    <Text style={styles.label}>Hear</Text>
                    <TextInput placeholder="type..." style={styles.textInputSenses} multiline={true} numberOfLines={3} onChangeText={setHearText}></TextInput>
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
    label: {
        marginTop: 15,
        marginLeft: 5,
        fontSize: 14,
        color: "#fff",
        fontFamily: 'Poppins_400Regular',
    },
    textInputSenses: {
        marginTop: 1,
        padding: 10,
        backgroundColor: "#D9D9D9",
        height: 100,
        textAlignVertical: "top",
        borderRadius: 10,
        fontFamily: 'Poppins_400Regular',
    },
})