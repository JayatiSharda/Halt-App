import { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Pressable, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { setsound } from "../reducers/soundReducer";

export default function Emotions({navigation, route}){
    const sound = useSelector((state) => state.sound.sound);
    const dispatch = useDispatch();
    const {emotion} = route.params;
    const feelingContainerRef = useRef();
    const [feelingCounter, setFeelingCounter] = useState(0);
    const emotionsReducer = useSelector((state) => state.emotions[emotion.toString().toLowerCase()]);
    const [feelings, setFeelings] = useState([]);
    const [selectedFeelings, setSelectedFeelings] = useState([]);

    useEffect(() => {
        if(feelings.length === 0){
            setFeelings(emotionsReducer);
        }
        return sound ? () => {
            sound.current.unloadAsync();
            dispatch(setsound(null))
        }
        : undefined
    }, [feelings, sound])

    const navigateToPlayList = () => {
        navigation.navigate("playlist", {emotion: emotion})
    }

    const onSelectFeeling = (e, key) => {
        e.preventDefault();
        setFeelingCounter(feelingCounter + (selectedFeelings.includes(key) ? -1 : 1));
        setSelectedFeelings((prevSelected) => {
          if (prevSelected.includes(key)) {
            feelingContainerRef.current.setNativeProps({
                backgroundColor: "#424663"
            })
            return prevSelected.filter((selectedKey) => selectedKey !== key);
          } else {
            feelingContainerRef.current.setNativeProps({
                backgroundColor: "#7871FC"
            })
            return [...prevSelected, key];
          }
        });

    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.container}>
                <View style={{flex: 1, padding: 20}}>
                    <Text style={styles.subHeader}>Select from the bubbles of emotions:</Text>
                    <View style={styles.feelingsContainer}>
                        {feelings.length !== 0 ? feelings.map((feeling, key) => (
                            <Pressable style={styles.feelingButton} onPress={(e) => onSelectFeeling(e, key)} key={key} ref={feelingContainerRef}>
                                <Text style={styles.feelingText} key={key}>{feeling}</Text>
                            </Pressable>
                        ))
                        : <></>}
                    </View>
                    {feelingCounter !== 0 ?
                    <TouchableOpacity style={styles.primaryButton} onPress={navigateToPlayList}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity>
                    :<></>}
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
    feelingsContainer: {
        flex: 1,
    },
    feelingButton: {
        flex: 1,
        borderRadius: 40,
        padding: 20,
        marginBottom: 20,
        backgroundColor: "#424663",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#7871FC"
    },
    feelingText: {
        color: "#fff",
        fontFamily: 'Poppins_400Regular',
    },
    primaryButton: {
        width: 130,
        marginTop: 30,
        marginLeft: "auto",
        marginRight: "auto",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#C59F1A",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#272C40",
        borderWidth: 1,
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
        fontFamily: 'Poppins_400Regular',
    }

})