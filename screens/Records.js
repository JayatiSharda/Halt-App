import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, FlatList, Keyboard } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import Tabs from "../components/Tabs"
import { Feather } from '@expo/vector-icons'; 
import Menu from "../components/Menu"
import { useSelector } from "react-redux";
import EmotionChart from "../components/EmotionChart";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Ionicons } from '@expo/vector-icons'; 
import Checkbox from 'expo-checkbox';

export default function Records({navigation, route}){
    const emotions = useSelector((state) => state.emotions.emotions)
    const user = useSelector((state) => state.user.user)
    const emotionsContainerRef = useRef([]);
    const [emotionsContainerExpanded, setEmotionsContainerExpanded] = useState([false, false, false, false, false, false, false, false, false]) 
    const [emotionsGraphData, setEmotionsGraphData] = useState(null)
    const [hattricks, setHattricks] = useState([]);
    const [getHattrickData, setGetHattrickData] = useState(true);
    const [joinedYear, setJoinedYear] = useState("")

    const getGraphData = async() => {
      if(emotionsGraphData === null){
        try{
          const date = new Date()
          date.setTime(user?.metadata?.createdAt)
          setJoinedYear(date.getFullYear())
          const dataSnap = await getDoc(doc(db, "halt", user?.uid))
          if(dataSnap.exists()){
            if(dataSnap.data()!==null && dataSnap.data()!==undefined){
              if(dataSnap.data().emotions !== null && dataSnap.data().emotions !==undefined){
                setEmotionsGraphData(dataSnap.data().emotions)
              }
            }
          } 
        }
        catch(e){
          console.log(e)
        }
      }
    }

    const getHattricks = async() => {
      if(getHattrickData){
        const dataSnap = await getDoc(doc(db, "halt", user?.uid))
        if(dataSnap.exists()){
          if(dataSnap.data() !== null && dataSnap.data()!== undefined){
            if(dataSnap.data()?.activities?.hattricks !== null && dataSnap.data()?.activities?.hattricks!==undefined){
              const hattricksData = dataSnap?.data()?.activities;
              var hattricksDataArr = []
              hattricksData["hattricks"]?.map((hattrick, key) => {
                var allTaskCompleted = true;
                hattrick["hattrick"]?.map((ht) => {
                  if(ht.completed === false)
                    allTaskCompleted = false;
                })
                if(!allTaskCompleted){
                  hattricksDataArr.push(hattricksData["hattricks"][key])
                }
              });
              setHattricks(hattricksDataArr);
              setGetHattrickData(false)
              }
          }
        }
        
      }
    }

    const updateGoals = async() => {
      const dataSnap = await getDoc(doc(db, "halt", user?.uid));
      let activities;
      if(dataSnap.exists()){
        activities = dataSnap?.data()?.activities
      }
      activities["hattricks"] = hattricks
      const dataRed = await updateDoc(doc(db, "halt", user?.uid), {
        activities: activities
      });
      setGetHattrickData(true);
      getHattricks();
      
    }

    useEffect(() => {
      getGraphData()
      getHattricks()
    }, [emotionsGraphData, user?.uid])

    toggleDropdownMenu = (key) => {
      emotionsContainerExpanded[key] = !emotionsContainerExpanded[key]
      setEmotionsContainerExpanded([...emotionsContainerExpanded])
    }
    
    return(
        <SafeAreaView style={{flex: 1}}>
            <Menu navigation={navigation}/>
            <ScrollView style={styles.container}>
                <View style={styles.nameInfo}>
                    <View style={styles.nameInfoContainer}>
                        <Image source={require('../assets/home-user.png')} style={styles.homeUserImage} />
                        <Text style={styles.welcomeUserText}>{user?.profile?.fname + " " + user?.profile?.lname}</Text>
                        <Text style={styles.welcomeUserSubText}>Joined in {joinedYear}</Text>
                    </View>
                </View>
                <View style={{padding: 20}}>
                    <Text style={styles.subHeader}>Activities records</Text>
                    {emotions.map((emotion, key) => (
                    <View key={key}>
                      <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.dropdownLeft} onPress={() => {if(emotion==='Bored' || emotion==='Fear' || emotion==='Hurt' || emotion==='Angry' || emotion==='Confused') toggleDropdownMenu(key)}}>
                            <Image source={emotion === 'Bored' ? require('../assets/Bored.png') : 
                              emotion === 'Fear' ? require('../assets/Fear.png') :
                              emotion === 'Hurt' ? require('../assets/Hurt.png') :
                              emotion === 'Angry' ? require('../assets/Angry.png') :
                              emotion === 'Confused' ? require('../assets/Confused.png') :
                              emotion === 'Remorse' ? require('../assets/Remorse.png') :
                              emotion === 'Inadequate' ? require('../assets/Inadequate.png') :
                              emotion === 'Lonely' ? require('../assets/Lonely.png') :
                              emotion === 'Depressed' ? require('../assets/Depressed.png') : null
                            } style={styles.dropdownImage}/>
                            <Text style={styles.dropdownText}>{emotion}</Text>
                        </TouchableOpacity>
                        {emotionsContainerExpanded[key] === true ?
                        <Feather name="chevron-up" size={24} color="#7871FC" />
                        : <Feather name="chevron-down" size={24} color="#7871FC" />}
                        </View>
                        {emotionsContainerExpanded[key] === true ?
                        <View style={styles.dropdownContainer} ref={el => emotionsContainerRef.current[key] = el}>
                          {emotionsGraphData !== null && emotionsGraphData !==undefined ?
                          <EmotionChart data={key==0 ? emotionsGraphData['Bored'] === undefined || null ? null : emotionsGraphData['Bored'] : 
                          key==1 ? emotionsGraphData['Fear'] === undefined || null ? null : emotionsGraphData['Fear'] :
                          key==2 ? emotionsGraphData['Hurt'] === undefined || null ? null : emotionsGraphData['Hurt'] :
                          key==3 ? emotionsGraphData['Angry'] === undefined || null ? null : emotionsGraphData['Angry'] :
                          key==4 ? emotionsGraphData['Confused'] === undefined || null ? null : emotionsGraphData['Confused'] :
                          key==5 ? emotionsGraphData['Remorse'] === undefined || null ? null : emotionsGraphData['Remorse'] :
                          key==6 ? emotionsGraphData['Inadequate'] === undefined || null ? null : emotionsGraphData['Inadequate'] :
                          key==7 ? emotionsGraphData['Lonely'] === undefined || null ? null : emotionsGraphData['Lonely'] :
                          key==8 ? emotionsGraphData['Depressed'] === undefined || null ? null : emotionsGraphData['Depressed'] : null
                          } emotion={emotion}/>
                         : <></>}
                         {emotion==="Confused" ?
                            <ScrollView style={styles.confusedContainer} horizontal={true} contentContainerStyle={{ alignItems: "center", justifyContent: "space-evenly" }}>
                              {hattricks && hattricks?.map((hattrick, key) => (
                              <ScrollView style={styles.confusedBox} nestedScrollEnabled contentContainerStyle={styles.confusedBoxScroll} key={key}>
                                <Text style={styles.activitySubHeader}>Don't forget to cancel your goals!</Text>
                                {hattricks[key]['hattrick']?.map((ht, ke) => (
                                  <View style={styles.goalSection} key={ke}>
                                  <Checkbox style={styles.checkbox} value={ht?.completed} color={ht?.completed ? '#413D84' : undefined} onValueChange={() => {
                                        hattricks[key]['hattrick'][ke].goal = hattricks[key]['hattrick'][ke]?.goal
                                        hattricks[key]['hattrick'][ke].completed = !hattricks[key]['hattrick'][ke]?.completed
                                        setHattricks([
                                            ...hattricks
                                        ])
                                  }} />
                                  <Text style={styles.goal}>{ht?.goal}</Text>
                                  </View>
                                ))}
                                <TouchableOpacity style={styles.goalButton} onPress={updateGoals}>
                                  <Ionicons name="checkmark" size={20} color="black" />
                                </TouchableOpacity>
                              </ScrollView>))}
                            </ScrollView>
                            :
                            <></>
                          }
                        </View>
                        : <></>}
                    </View>
                    ))
                    }
                </View>
            </ScrollView>
            <Tabs navigation={navigation} route={route}/>
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
    nameInfo: {
        width: "100%",
        height: 210,
        backgroundColor: '#354173',
        fontFamily: 'Poppins_400Regular',
      },
      nameInfoContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Poppins_400Regular',
      },
      homeUserImage:{
        flex: 1,
        marginTop: 20,
        resizeMode: "contain",
      },
      welcomeUserText: {
        color: "#fff",
        fontSize: 18,
        marginLeft: 15,
        fontFamily: 'Poppins_400Regular',
      },
      welcomeUserSubText: {
        color: "#EBEFFF",
        fontSize: 12,
        marginBottom: 15,
        fontFamily: 'Poppins_400Regular',
      },
      subHeader: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 30,
        fontFamily: 'Poppins_400Regular',
      },
      dropdown: {
        flex: 1,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "#EBEFFF",
        fontFamily: 'Poppins_400Regular',
      },
      dropdownLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        fontFamily: 'Poppins_400Regular',
      },
      dropdownImage: {
        width: 50,
        height: 50,
        objectFit: "contain"
      },
      dropdownText: {
        color: "#fff",
        marginLeft: 10,
        fontFamily: 'Poppins_400Regular',
      },
      dropdownContainer: {
        flex: 1,
      },
      graph: {
        flex: 1,
        marginTop: 0,
        paddingRight: 45,
        paddingTop: 25,
        fontFamily: 'Poppins_400Regular',
      },
      confusedContainer: {
        paddingVertical: 20,
        flexDirection: "row",
      },
      confusedBox: {
        flex: 1,
        width: 150,
        height: 220,
        padding: 15,
        marginRight: 10,
        backgroundColor: "#CBCFE0",
        borderRadius: 10,
      },
      confusedBoxScroll: {
        paddingBottom: 25,
      },
      goalSection: {
        flex: 1,
        padding: 6,
        paddingLeft: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        fontFamily: 'Poppins_400Regular',
      },
      activitySubHeader: {
        textAlign: "center",
        marginBottom: 15,
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
      },
      goal:{
        marginLeft: 5,
        fontSize: 11,
        fontFamily: 'Poppins_400Regular',
      },
      goalButton: {
        marginLeft: "auto",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 50,
      }
})