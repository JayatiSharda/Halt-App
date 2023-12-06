import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { setCurrentEmotionMeter } from "../reducers/userReducer";
import { useDispatch, useSelector } from 'react-redux'
import { FieldValue, Firestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import EmotionsEnd from "../components/EmotionsEnd";


export default function EmotionsMeterEnd({route, navigation}){
    const [quotes, setQuotes] = useState(null)
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const quotesReducer = useSelector((state) => state.quotes.quotes);
    const [emotionMeter, setEmotionMeter] = useState("");
    const { emotion } = route.params; 

    useEffect(() => {
        if(quotes===null){
            setQuotes(quotesReducer);
        }
    }, [quotes])

    const selectEmotionsMeter = (emotionMeterVal) => {
        setEmotionMeter(emotionMeterVal)
    }

    const setCurrentEmotionMeterForUser = async(emotionMeter) => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const monthName = date.toLocaleString('en-US', {month: 'short'});
        const dataSnap = await getDoc(doc(db, "halt", user?.uid))
        if(dataSnap.exists()){
            data = dataSnap?.data()
            if(data["emotions"]===null || data["emotions"]===undefined){
                const emotions = {}
                data["emotions"] = emotions
            }
            if(data["emotions"][emotion]===undefined){
                data["emotions"][emotion] = [{
                    "month": month,
                    "monthName": monthName,
                    "Strong": 0,
                    "Intermediate": 0,
                    "Light": 0,
                    "Good": 0,
                    "Relaxed": 0,
                    "Happy": 0,
                }]
            }
                var monthNotFound = true;
                data["emotions"][emotion]?.map((res, key) => {
                    if(res.monthName === monthName){
                        data["emotions"][emotion][key][emotionMeter] = data["emotions"][emotion][key][emotionMeter] + 1;
                        monthNotFound = false
                    }
                })
                if(monthNotFound){
                    data["emotions"][emotion]?.push({
                        "month": month,
                        "monthName": monthName,
                        "Strong": 1,
                        "Intermediate": 1,
                        "Light": 1
                    })
                }
            const dataRef = await updateDoc(doc(db, "halt", user?.uid), data)
        }
        
        
    }

    const navigateToHome = () => {
        dispatch(setCurrentEmotionMeter(emotionMeter));
        setCurrentEmotionMeterForUser(emotionMeter);
        navigation.navigate("home")
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.container}>
                <View style={{flex: 1, padding: 20}}>
                    {quotes!==null && quotes[emotion] !== null &&
                    <View style={styles.quotesContainer}>
                        <Text style={styles.quotesText}>{'“' + quotes[emotion]['quote'] + '”'}</Text>
                        <Text style={styles.quotesAuthor}>{"- " + quotes[emotion]['author']}</Text>
                    </View>}
                    <Text style={styles.subHeader}>Select the intensity</Text>
                    <EmotionsEnd onSelectEmotionsMeter={selectEmotionsMeter} />
                    {emotionMeter !== "" ?
                    <TouchableOpacity style={styles.primaryButton} onPress={navigateToHome}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity>
                    : <></>}
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
        color: "#fff",
        marginLeft: 10,
        fontSize: 18,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 40,
    },
    quotesContainer: {
        flex: 1,
        backgroundColor: "#354173",
        padding: 25,
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 40,
    },
    quotesText: {
        flex: 1,
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: "#fff"
    },
    quotesAuthor: {
        flex: 1,
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        fontStyle: "italic",
        marginLeft: "auto",
        color: "#f7f7f7"
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
    }
})