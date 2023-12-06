import { useEffect, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TouchableOpacity, Modal, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from "react-redux";
import { setsound } from "../reducers/soundReducer";
import { addDoc, collection, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Checkbox from 'expo-checkbox';


export default function Hattricks({navigation, route}){
    const {emotion} = route.params
    const sound = useSelector((state) => state.sound.sound.current)
    const user = useSelector((state) => state.user.user)
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const {mood} = route.params;
    const [goals, setGoals] = useState([]);
    const [goal, setGoal] = useState("")
    const [isPauseMusic, setIsPauseMusic] = useState(true)

    const openModal = () => {
        setModal(true);
    }

    const save = async() => {
        setModal(false);
        const dataSnap = await getDoc(doc(db, "halt", user?.uid))
        if(dataSnap?.exists()){
            if(dataSnap?.data()!==null || dataSnap?.data!==undefined){
                if(dataSnap?.data()?.activities!==null || dataSnap?.data?.activities!==undefined){
                    var activities = dataSnap?.data()?.activities;
                    if(activities["hattricks"]===undefined || activities["hattricks"] === null){
                        activities = {
                            hattricks: new Array()
                        }
                    }
                    activities["hattricks"].push({
                        hattrick: goals
                    })
                    await updateDoc(doc(db,"halt" ,user.uid, ), {
                        activities: activities
                    })
                    navigation.navigate("saveRecords", {emotion: emotion});
                }
            }
        }
    }

    const dontSave = () => {
        setModal(false);
        navigation.navigate("saveRecords");
    }

    const onPlayPauseMusic = () => {
        if(isPauseMusic){
            sound.pauseAsync();
            setIsPauseMusic(!isPauseMusic);
        }
        else{
            sound.playAsync();
            setIsPauseMusic(!isPauseMusic);
        }
    }

    const addGoal = () => {
        Keyboard.dismiss()
        if(goal!==""){
            setGoals([
                ...goals,
                {
                    goal: goal,
                    completed: false
                }
            ])
        }
        setGoal("")
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
                    <Text style={styles.subHeader}>Make a list of three goals you want to accomplish today and remember they can be very small and simple goals!</Text>
                    <View style={styles.activityBlock}>
                        <View style={styles.activityInputContainer}>
                            <TextInput placeholder="type..." style={styles.activityInputText} onChangeText={setGoal} value={goal} />
                            <TouchableOpacity>
                                <FontAwesome5 name="plus-circle" size={40} color="#959595" onPress={addGoal}  />
                            </TouchableOpacity>
                        </View>
                        {goals.length!==0 ? goals.map((goal, key) => ( 
                            <View style={styles.activityDetailsContainer} key={key}>
                                <View style={styles.activityDetailBlock}>
                                    <Checkbox style={styles.checkbox} value={goal?.completed} color={goal?.completed ? '#413D84' : undefined} onValueChange={() => {
                                        goals[key].goal = goals[key].goal
                                        goals[key].completed = !goals[key].completed
                                        setGoals([
                                            ...goals
                                        ])
                                    }} />
                                    <Text style={styles.activityDetailsContainerText}>{goal?.goal}</Text>
                                </View>
                            </View>
                        ))
                        : <></>
                        }
                    </View>
                    {goals.length !== 0 ?
                    <TouchableOpacity style={styles.primaryButton} onPress={openModal}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity>
                    :<></>}
                </View>
                <Modal
                    animation={"slide"} transparent={true} visible={modal} 
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Text style={styles.modalHeader}>Save the activity?</Text>
                            <Text style={styles.modalText}>The activities will be saved in the designated folders within the Records option, allowing you to conveniently revisit and reflect on them at a later time.</Text>
                            <Pressable style={styles.modalButton}><Text style={styles.modalButtonText} onPress={dontSave}>Don't Save</Text></Pressable>
                            <Pressable style={styles.modalButton}><Text style={styles.modalButtonText} onPress={save}>Save</Text></Pressable>
                        </View>
                    </View>
                </Modal>
                
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
        color: "#868686",
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
    activityBlock: {
        backgroundColor: "#D9D9D9",
        padding: 30,
        borderRadius: 10
    },
    activityInputContainer: {
        flex: 1,
        flexDirection: "row"
    },
    activityInputText: {
        flex: 1,
        marginRight: 8,
        fontFamily: 'Poppins_400Regular',
    },
    activityDetailsContainer: {
        flex: 1,
        flexDirection: "column",
        marginTop: 20,
    },
    activityDetailsContainerText:{
        color: "#000",
        marginLeft: 10,
        fontFamily: 'Poppins_400Regular',
    },
    activityDetailsContainerImage: {
        width: 40,
        height: 40,
        objectFit: "contain",
        marginRight: 10,
    },
    activityDetailBlock: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    primaryButton: {
        width: 130,
        marginTop: 30,
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
    checkbox: {
        backgroundColor: "#fff",
        border: "none",
        borderColor: "#fff",
        outline: "none",
        padding: 15,
        shadowColor: '#F7F7F7',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 15,
        zIndex: 999,
        fontFamily: 'Poppins_400Regular',
    }

})