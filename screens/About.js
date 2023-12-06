import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Tabs from "../components/Tabs";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";


export default function About({navigation, route}){

    const navigateToMantra = () => {
        navigation.navigate("Mantra")
      }
  

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: "#1A1F33"}}>
            <ScrollView style={{flex: 1, backgroundColor: "#1A1F33", paddingHorizontal: 20}}>
                <Text style={{fontSize: 20, fontFamily: 'Poppins_400Regular',color: "#C59F1A"}}>About Mantra Repetition</Text>
                <Text style={{color: "#EBEFFF", fontFamily: 'Poppins_400Regular', marginTop: 14, marginBottom: 14, fontSize: 14}}>Reciting or chanting "Om" daily can be a deeply enriching and spiritually fulfilling practice. It's not just a simple sound; it carries profound meaning and benefits. Here's why you might consider making it a daily ritual, and why it can be so motivating:</Text>
                <Text style={{fontSize: 14, color: "#9E99FF", fontFamily: 'Poppins_400Regular', marginBottom: 3}}>1. Spiritual Connection</Text>
                <Text style={{fontSize: 14, color: "#CBCFE0", fontFamily: 'Poppins_400Regular', marginBottom: 10}}>Chanting "Om" is a way to connect with the universal consciousness or divine energy. It is often considered the primordial sound from which the entire universe emanated. By reciting it, you're aligning yourself with this cosmic energy, fostering a sense of oneness and spiritual connection.</Text>
                <Text style={{fontSize: 14, color: "#9E99FF",fontFamily: 'Poppins_400Regular', marginBottom: 3}}>2. Inner Peace</Text>
                <Text style={{fontSize: 14, color: "#CBCFE0", fontFamily: 'Poppins_400Regular',marginBottom: 10}}>The vibration of "Om" is soothing and calming. Regular chanting can help reduce stress and anxiety, bringing a sense of inner peace. It's like a mini-meditation that you can incorporate into your daily routine to find tranquility amidst the chaos of daily life.</Text>
                <Text style={{fontSize: 14, color: "#9E99FF",fontFamily: 'Poppins_400Regular', marginBottom: 3}}>3. Mindfulness and Focus</Text>
                <Text style={{fontSize: 14, color: "#CBCFE0",fontFamily: 'Poppins_400Regular', marginBottom: 10}}>Chanting Om requires concentration on the sound and its resonance. This practice naturally enhances your mindfulness and focus. It can be a great way to start or end your day with a clear and centered mind.</Text>
                <Text style={{fontSize: 14, color: "#9E99FF",fontFamily: 'Poppins_400Regular', marginBottom: 3}}>4. Positive Energy</Text>
                <Text style={{fontSize: 14, color: "#CBCFE0",fontFamily: 'Poppins_400Regular', marginBottom: 10}}>Om is believed to emit positive energy. When you chant it, you're filling your surroundings with this positive vibration. This can create a harmonious atmosphere and influence your own mood and the mood of those around you.</Text>
                <Text style={{fontSize: 14, color: "#9E99FF",fontFamily: 'Poppins_400Regular', marginBottom: 3}}>5. Physical Benefits</Text>
                <Text style={{fontSize: 14, color: "#CBCFE0",fontFamily: 'Poppins_400Regular', marginBottom: 10}}>The act of chanting "Om" involves controlled breathing, which can improve lung capacity and oxygenate your body. It's also a gentle exercise for your vocal cords and can help with speech and pronunciation.</Text>
                <Text style={{fontSize: 14, color: "#9E99FF",fontFamily: 'Poppins_400Regular', marginBottom: 3}}>6. Emotional Balance</Text>
                <Text style={{fontSize: 14, color: "#CBCFE0",fontFamily: 'Poppins_400Regular', marginBottom: 10}}>Regularly chanting Om can help you become more emotionally balanced. It can assist in processing and releasing negative emotions, making room for more positivity and joy in your life.</Text>
                <Text style={{fontSize: 14, color: "#9E99FF",fontFamily: 'Poppins_400Regular', marginBottom: 3}}>7. Ritual and Routine</Text>
                <Text style={{fontSize: 14, color: "#CBCFE0",fontFamily: 'Poppins_400Regular', marginBottom: 10}}>Incorporating a daily Om chant into your routine can provide structure and a sense of ritual to your day. It's a reminder to take a moment for self-care and spiritual connection, which can be incredibly motivating and fulfilling.</Text>
                <Text style={{fontSize: 14, color: "#9E99FF",fontFamily: 'Poppins_400Regular', marginBottom: 3}}>8. Affirmation of Purpose</Text>
                <Text style={{fontSize: 14, color: "#CBCFE0",fontFamily: 'Poppins_400Regular', marginBottom: 10}}>Om is often considered a sound that signifies the essence of ultimate reality or truth. When you chant it, you're affirming your connection to a higher purpose or greater truth, which can be highly motivating for those seeking meaning and direction in life.</Text>
                <Text style={{fontSize: 14, color: "#9E99FF",fontFamily: 'Poppins_400Regular', marginBottom: 3}}>9. Cultural and Historical Significance</Text>
                <Text style={{fontSize: 14, color: "#CBCFE0",fontFamily: 'Poppins_400Regular', marginBottom: 10}}>Om has been chanted for thousands of years in various cultures and spiritual traditions. By reciting it daily, you become part of this rich tapestry of human history, connecting with the wisdom of countless generations.</Text>
                <Text style={{color: "#EBEFFF",fontFamily: 'Poppins_400Regular', marginTop: 14, marginBottom: 14, fontSize: 14}}>Incorporating the daily chanting of "Om" into your life can be a beautiful and meaningful practice. It can help you find inner peace, spiritual connection, and a sense of purpose, making each day a little more fulfilling and motivating.</Text>

               
                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("mantra")}>
                        <Text style={styles.primaryButtonText}>Go to Mantra page</Text>
                </TouchableOpacity>
                
            </ScrollView>
            <Tabs navigation={navigation} route={route}/>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
   
    
    
    primaryButton: {
        flex: 1,
        width: "65%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: "#C59F1A",
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
        textAlign: "center",
        fontFamily: 'Poppins_400Regular',
    }
   
   


})