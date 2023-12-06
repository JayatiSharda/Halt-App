import { SafeAreaView, ScrollView, View, StyleSheet, Text, Pressable, Image } from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useState } from "react";

export default function Activities({navigation, route}){
    const {emotion} = route.params;
    const [isPlaying, setIsPlaying] = useState(true);
    const activities = useSelector((state) => state?.activities[emotion?.toString()?.toLowerCase()])
    const sound = useSelector((state) => state.sound.sound.current)

    const navigateToActivity = (activity) => {
        navigation.navigate(activity.replaceAll(" ", ""), {emotion: emotion});
        console.log(emotion)
    }

    const playPauseMsuic = () => {
        if(isPlaying){
            sound.stopAsync();
            setIsPlaying(false)
        }
        else{
            sound.playAsync();
            setIsPlaying(true)
        }
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.container}>
                <View style={{flex: 1, padding: 20}}>
                    <TouchableOpacity style={styles.musicControlButton} onPress={() => playPauseMsuic()}>{isPlaying ? <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row"}}><MaterialCommunityIcons name="equalizer-outline" size={18} color="black" /><Text style={{fontSize: 14}}> Soundscape playing...</Text></View> :  <Text style={{marginLeft: "auto", marginRight: "auto"}}>Soundscape paused...</Text>}</TouchableOpacity>
                    <Text style={styles.subHeader}>Take control of your emotions with these simple yet powerful activities</Text>
                    <View style={styles.activitiesContainer}>
                        {activities.length !== 0 ? activities.map((activity , key) => 
                        <TouchableOpacity style={styles.activityContainer} onPress={() => navigateToActivity(activity)} key={key}>
                            <Text style={styles.activityName}>{activity}</Text>
                            <Image style={styles.activityButton} source={require("../assets/forward_arrow.png")}/>
                        </TouchableOpacity>
                        ):<></>
                        }   
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
    activitiesContainer: {
        flex: 1,
    },
    activityContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingTop: 22,
        paddingBottom: 22,
        borderBottomColor: "#D1D1D1"
    },
    activityName: {
        color: "#fff",
        marginLeft: 10,
        fontFamily: 'Poppins_400Regular',
    },
    activityButton: {
        width: 16,
        height: 16,
        objectFit: "contain"
    },
    musicControlButton: {
        marginVertical: 10,
        width: 200,
        padding: 6,
        borderRadius: 45,
        backgroundColor: "#C59F1A",
    }
})