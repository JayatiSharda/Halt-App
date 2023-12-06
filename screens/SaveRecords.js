import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setsound } from "../reducers/soundReducer";

export default function SaveRecords({navigation, route}){
    const { emotion } = route.params;
    const sound = useSelector((state) => state.sound.sound.current);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("emotionsmeterend", {emotion: emotion});
        },1500)
        return sound ? () => {
            sound.unloadAsync();
            dispatch(setsound(null))
        }
        : undefined
    })
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.saveRecordsContainer}>
                <View style={styles.saveRecordsBlock}>
                    
                    <Image style={styles.image} source={require("../assets/saveRecords.png")} />
                    <Text style={styles.text}>Hope you're feeling better!</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    saveRecordsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    saveRecordsBlock: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    image:{
        width: 350,
        height: 350,
        resizeMode: "contain"
    },
    header: {
        fontSize: 20,
        width: 250,
        textAlign: "center"
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    }

})