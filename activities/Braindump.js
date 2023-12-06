import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, ImageBackground, TextInput, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function Braindump({navigation, route}){
    const { emotion } = route.params
    const mainContainer = useRef(new Animated.Value(1)).current
    const leftContainer = useRef(new Animated.Value(0)).current
    const rightContainer = useRef(new Animated.Value(0)).current
    const sound = useSelector((state) => state.sound.sound.current)
    const [point, setPoint] = useState("");
    const [counter, setCounter] = useState(0);
    const [points, setPoints] = useState([]);
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

    const addPoints = () => {
        if(point!=="" && point.length!==0 && point.trim()!==""){
            setPoints([...points, point]);
            setPoint("")
        }
    }
    
    const breakPage = () => {
        if(counter === 5 && points.length > 0){
            Animated.parallel([
                Animated.timing(mainContainer, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),

                Animated.timing(leftContainer, {
                  toValue: -250,
                  duration: 700,
                  useNativeDriver: true,
                }),
          
                Animated.timing(rightContainer, {
                  toValue: 250,
                  duration: 700,
                  useNativeDriver: true,
                }),
            ]).start(() => navigation.navigate("saveRecords", {emotion: emotion}));
        }
        else{
            setCounter(counter+1)
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
                    <Text style={styles.subHeader}>List down things that are making you angry:</Text>
                    <Pressable style={styles.pressBrainDumpContainer} onPress={breakPage}>
                        <Animated.View style={[styles.brainDumpContainer, {opacity: mainContainer}]} ref={mainContainer}>
                            <View style={styles.brainDumpInputContainer}>
                                <TextInput style={styles.brainDumpInput} placeholder="type..." value={point} onChangeText={setPoint} />
                                <FontAwesome5 name="plus-circle" style={styles.brainDumpButton} size={40} color="#959595" onPress={addPoints} />
                            </View>
                            <ScrollView style={styles.brainDumpOutputContainer}>
                                {points.length!==0 && points.map((pnt, key) => (
                                    <Text key={key}>{(key+1)+ ". "+pnt}</Text>
                                ))
                                }
                            </ScrollView>
                            <Animated.View style={[styles.brainDumpBox1 , {transform: [{translateX: leftContainer}]}]} ref={leftContainer}>
                            </Animated.View>
                            <Animated.View style={[styles.brainDumpBox2 , {transform: [{translateX: rightContainer}]}]} ref={rightContainer}>
                            </Animated.View>
                        </Animated.View>
                    </Pressable>
                    {points.length > 0 &&
                        <Text style={styles.footerText}>Now keep on tapping on the note till it tears apart!</Text>
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
        marginBottom: 25,
        fontFamily: 'Poppins_400Regular',
    },
    pressBrainDumpContainer:{
        flex: 1,
        height: 450,
    },
    brainDumpContainer: {
        flex: 1,
        height: 450,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    brainDumpBox1: {
        width: "50%",
        height: 450,
        left: 0,
        backgroundColor: "#D9D9D9",
        position: "absolute",
    },
    brainDumpBox2: {
        width: "50%",
        height: 450,
        right: 0,
        backgroundColor: "#D9D9D9",
        position: "absolute",
    },
    brainDumpInputContainer: {
        flex: 0.2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 9,
    },
    brainDumpInput: {
        flex: 1,
        marginLeft: 15,
        marginRight: 10,
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    brainDumpOutputContainer: {
        flex: 1,
        width: "90%",
        zIndex: 9,
        marginLeft: 15,
        marginBottom: 15,
    },
    brainDumpButton: {
        marginRight: 15,
    },
    footerText:{
        flex: 1,
        padding: 20,
        textAlign: "center",
        fontSize: 20,
        color: "#C59F1A",
        lineHeight: 27,
        fontFamily: 'Poppins_400Regular'
    }

})