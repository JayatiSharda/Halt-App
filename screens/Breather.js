import { useState } from "react"
import { Image, Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function Breather({navigation}){
    const [key, setKey] = useState(0);
    const [startTime, setStartTime] =  useState(false);
    const startTimer = () => {
        setStartTime(true)
        setKey(key + 1)
    }
    const stopTimer = () => {
        setStartTime(false)
        setTimeout(() => {
            navigation.navigate("home")
        }, 5000)
    }


    return(
        <View style={styles.breatherContainer}>
            {startTime===false && key > 0 ? 
                <View style={styles.breatherBox}>
                    <Text style={styles.breatherHeader1}>That’s a good start!...</Text>
                    <Image style={styles.breatherEndImage} source={require('../assets/breatherEnd.png')}/>
                </View> :  
                <View style={styles.breatherBox}>
                    <Text style={styles.breatherHeader}>Clear your mind with us...</Text>
                    <Pressable onPress={startTimer}>
                        <CountdownCircleTimer
                            key={key}
                            duration={10}
                            size={250}
                            style={styles.timer}
                            colors={['#f00', '#0f0']}
                            colorsTime={[10, 0]}
                            isPlaying={startTime}
                            onComplete={stopTimer}
                            strokeWidth={7}
                        >
                            {({ remainingTime }) =>  remainingTime < 10 && remainingTime > 5 ?  <Text style={styles.breatherText}>Breath In...</Text> : remainingTime < 5 && remainingTime > 0 ? <Text style={styles.breatherText}>Breath Out...</Text> : remainingTime === 10 ? <Text style={styles.breatherText}>Press to start timer</Text> : <></>}
                        </CountdownCircleTimer>
                    </Pressable>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    breatherContainer: {
        flex: 1,
        backgroundColor: "#1A1F33",
        alignItems: "center",
        justifyContent: "center"
    },
    breatherBox: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    breatherHeader: {
        marginBottom: 71,
        color: "#C59F1A",
        fontSize: 24,
        fontFamily: 'Poppins_400Regular',
    },
    breatherHeader1: {
        marginBottom: 50,
        color: "#C59F1A",
        fontSize: 24,
        fontFamily: 'Poppins_400Regular',
    },
    timer: {
        flex: 1,
        width: 500,
    },
    timerText: {
        color: "#fff",
        fontFamily: 'Poppins_400Regular',
    },
    timerCircle: {
        width: 100,
        height: 100,
        objectFit: "contain"
    }
    ,breatherEndImage: {
        width: 300,
        height: 300,
        objectFit: "contain"
    },
    breatherText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: 'Poppins_400Regular',
    }
})
