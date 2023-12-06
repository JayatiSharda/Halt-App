import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setsound } from "../reducers/soundReducer";


export default function Stretchout({navigation, route}){
    const {emotion} = route.params
    const sound = useSelector((state) => state.sound.sound.current)
    const dispatch = useDispatch();
    const [workOutCounter, setWorkOuCounter] = useState(0);
    const previousWorkOut = () => {
        if(workOutCounter > 0 && workOutCounter < 4){
            setWorkOuCounter(workOutCounter - 1)
        }
    }
    const nextWorkOut = () => {
        if(workOutCounter < 3 && workOutCounter >= 0){
            setWorkOuCounter(workOutCounter + 1)
        }
    }
    const navigateToHone = () => {
        sound.unloadAsync();
        dispatch(setsound(null))
        navigation.navigate("home", {emotion: emotion})
    }

    const [workOut, setWorkOut] = useState([{
        image: require("../assets/pana.png"),
        text: "Stretch your knee inwards"
    },{
        image: require("../assets/pana1.png"),
        text: "Bend sideways from the waist"
    },
    {
        image: require("../assets/pana2.png"),
        text: "Stretch out other knee"
    },
    {
        image: require("../assets/pana3.png"),
        text: "Stretch out knee backwards"
    }])
    const {mood} = route.params;
    const [isPauseMusic, setIsPauseMusic] = useState(true)
    const onPlayPauseMusic = () => {
        if(pauseMusic){
            sound.stopAsync();
            setIsPauseMusic(!isPauseMusic);
        }
        else{
            sound.playAsync();
            setIsPauseMusic(!isPauseMusic);
        }
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.container}>
                <View style={{flex: 1, padding: 20}}>
                    <View style={styles.activityHeaderContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image style={styles.backButtonImage} source={require("../assets/arrow_back.png")}/>
                        </Pressable>
                        <Pressable onPress={onPlayPauseMusic}>
                           {isPauseMusic ? <Image style={styles.musicPlayPauseImage} source={require("../assets/playMusic.png")}/> : <Image style={styles.musicPlayPauseImage} source={require("../assets/pauseMusic.png")}/> } 
                        </Pressable>
                    </View>
                    <Text style={styles.subHeader}>Try this exercise out! (10 secs each)</Text>
                    <View style={styles.workOutContainer}>
                        <Text style={styles.workOutHeader}>Remember to move slowly and gently to avoid injury, and to breathe deeply throughout the stretch.</Text>
                        <View style={styles.workOutBorder}></View>
                        <Text style={styles.workOutPages}>{(workOutCounter+1) + "/4"}</Text>
                        <Image source={workOut[workOutCounter].image} style={styles.workOutImage}/>
                        <Text style={styles.workOutName}>{workOut[workOutCounter].text}</Text>
                        {workOutCounter !==0 &&  <Pressable style={styles.leftButton} onPress={previousWorkOut}><FontAwesome name="caret-left" size={24} color="#5E5D61" /></Pressable>}
                        {workOutCounter !==3 && <Pressable style={styles.rightButton} onPress={nextWorkOut}><FontAwesome name="caret-right" size={24} color="#5E5D61" /></Pressable>}
                    </View>
                </View>
                <TouchableOpacity style={styles.primaryButton} onPress={navigateToHone}>
                    <Text style={styles.primaryButtonText}>Done</Text>
                </TouchableOpacity>
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
        marginBottom: 25,
        fontFamily: 'Poppins_400Regular',
    },
    workOutContainer:{
        flex: 1,
        padding: 15,
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: "#ECECEC",
        borderRadius: 10
    },
    workOutImage: {
        width: 350,
        height: 350,
        objectFit: "contain"
    },
    workOutHeader: {
        textAlign: "center",
        color: "#5E5D61",
        lineHeight: 22,
        fontFamily: 'Poppins_400Regular',
    },
    workOutPages: {
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
    },
    workOutName: {
        textAlign: "center",
        fontFamily: 'Poppins_400Regular',
    },
    workOutBorder: {
        flex: 0.7,
        marginLeft: 20,
        marginRight: 20,
        height: 2,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "#D3D3D3"
    },
    leftButton: {
        position: "absolute",
        padding: 10,
        flex: 1,
        top: 240,
        left: 10,
    },
    rightButton: {
        flex: 1,
        position: "absolute",
        padding: 10,
        right: 10,
        top: 240,
    },
    primaryButton: {
        width: 130,
        marginTop: 5,
        marginBottom: 30,
        marginLeft: "auto",
        marginRight: "auto",
        height: 50,
        borderRadius: 10,
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
    }
})