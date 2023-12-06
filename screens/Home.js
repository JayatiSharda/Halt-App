import  {Text, View, StyleSheet, Image, Pressable, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from '../components/Menu';
import Tabs from '../components/Tabs';
import { useSelector } from 'react-redux';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from "react-native";
import { useIsFocused } from '@react-navigation/native';


export default function Home({navigation, route}){
  const sound = useSelector((state) => state.sound.sound)
  const navigateToMoods = () => {
    navigation.navigate("emotionsList")
  }
  const navigateToMantra = () => {
    navigation.navigate("mantra")
  }
  const navigateToBreather = () => {
    navigation.navigate("breather")
  }

  const navigateToAboutMantra = () => {
    navigation.navigate("about")
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused && sound !== null && sound !== undefined){
      sound.unloadAsync();
    }
  },[isFocused])

  const user = useSelector((state) => state?.user?.user)
    return(
        <SafeAreaView style={{flex: 1}} >
            <Menu navigation={navigation}/>
            <ScrollView style={styles.container}>
                <View style={styles.nameInfo}>
                    <View style={styles.nameInfoContainer}>
                        <Image source={require('../assets/home-user.png')} style={styles.homeUserImage} />
                        <Text style={styles.welcomeUserText}>{"Hey " + user?.profile?.fname + "!"}</Text>
                    </View>
                </View>
                
                <TouchableOpacity style={styles.box} onPress={navigateToBreather}>
                    <Image source={require('../assets/home-breather.png')} style={styles.boxImage}/>
                    <View style={styles.boxRuler}></View>
                    <Text style={styles.boxText}>Let's take a quick breather...</Text>
                </TouchableOpacity>
                <Text style={styles.subHeader}>What do you want to work on?</Text>
                <TouchableOpacity style={styles.homeBlock} onPress={navigateToMoods}>
                    <Image source={require('../assets/home-mood.png')} style={styles.homeBlockImage} />
                    <Text style={styles.homeBlockText}>Select Mood</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeBlock} onPress={navigateToMantra}>
                    <Image source={require('../assets/home-mantra.png')} style={styles.homeBlockImage} />
                    <Text style={styles.homeBlockText}>Mantra Repetiton</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeBlock} onPress={navigateToAboutMantra}>
                    <Image source={require('../assets/home-about-mantra.png')} style={styles.homeBlockImage} />
                    <Text style={styles.homeBlockText}>About Mantra</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeBlock}>
                    <Image source={require('../assets/home-activity.png')} style={styles.homeBlockImage} />
                    <Text style={styles.homeBlockText}>Random Activity</Text>
                </TouchableOpacity>
            </ScrollView>
            <Tabs navigation={navigation} route={route}/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#1A1F33",
      fontSize: 20,
      flex: 0.8,
    },
    nameInfo: {
      width: "100%",
      height: 170,
      backgroundColor: '#354173',
    },
    nameInfoContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    homeUserImage:{
      flex: 0.5,
      marginTop: 20,
      resizeMode: "contain",
    },
    welcomeUserText: {
      color: "#fff",
      fontSize: 18,
      marginLeft: 15,
      fontFamily: 'Poppins_400Regular',
    },
    box: {
      borderWidth: 2,
      borderColor: "#5e699a",
      borderRadius: 10,
      width: "85%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 25,
      height: 177,
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row"
    },
    boxImage: {
      flex: 0.3,
      resizeMode: "contain"
    },
    boxRuler: {
      flex: 0.007,
      flex: 0.004,
      backgroundColor: "#EBEFFF",
      height: "50%",
    },
    boxText: {
      flex: 0.3,
      fontSize: 16,
      textAlign: "left",
      color: "#fff",
      lineHeight: 23,
      letterSpacing: 0.4,
      fontFamily: 'Poppins_400Regular',
    },
    subHeader: {
      fontSize: 18,
      color: "#fff",
      textAlign: "center",
      marginTop: 25,
      marginBottom: 25,
      fontFamily: 'Poppins_400Regular',
    },
    homeBlock: {
      borderWidth: 2,
      padding: 10,
      borderColor: "#5e699a",
      borderRadius: 10,
      width: "85%",
      marginLeft: "auto",
      marginRight: "auto",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginBottom: 20,
    },
    homeBlockImage:{
      width: 100,
      height: 100,
      marginLeft: 10,
      resizeMode: "contain",
    },
    homeBlockText: {
      fontSize: 16,
      color: "#fff", 
      marginLeft: 20,
      fontFamily: 'Poppins_400Regular',
    },
  
});
  