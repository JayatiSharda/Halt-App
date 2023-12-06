import { View, Text,Image, StyleSheet, Touchable, ScrollView, Modal } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from "react-native";
import { TextInput } from "react-native";
import { useSelector } from "react-redux";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Tabs from "../components/Tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { useEffect } from "react";
import { signOut } from "firebase/auth";


export default function Profile({navigation , route}){
    const user = useSelector((state) => state.user.user)
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    }
    const getUserData = async() => {
        const dataSnap = await getDoc(doc(db, "halt", user?.uid))
        const result = dataSnap.data()
        setFname(result?.profile?.fname)
        setLname(result?.profile?.lname)
    }
    useEffect(() => {
        getUserData()
    }, [])


    const updateUserData = async() => {
        if(fname!=="" && lname!==""){
            await updateDoc(doc(db, "halt", user?.uid), {
                "profile.fname": fname,
                "profile.lname": lname
            })
            setModal(true)
        }
    }

    const closeModal = () => {
        setModal(false)
    }

    const onLogout = async() => {
        signOut(auth).then(() => {
            navigation.navigate("login")
        })
    }

    const goBack = () => {
        navigation.goBack()
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.headerContainer}>
                <View style={styles.headerContainerLeft}>
                    <Pressable onPress={goBack}><Ionicons name="arrow-back" size={24} color="#fff" /></Pressable>
                    <Text style={styles.headerText}>Profile</Text>
                </View>
                <Image source={require('../assets/home-user.png')} style={styles.profileImage} />
            </View>
            <ScrollView style={{flex: 1}}>
            <View style={styles.profileBlock}>
                <Image source={require('../assets/home-user.png')} style={styles.profileBlockImage} />
                <TextInput style={styles.textInput} placeholder="First Name" value={fname} onChangeText={txt => setFname(txt)} />
                <TextInput style={styles.textInput} placeholder="Last Name" value={lname} onChangeText={txt => setLname(txt)} />
                <TouchableOpacity style={styles.primaryButton}><Text style={styles.primaryButtonText} onPress={updateUserData}>Save Changes</Text></TouchableOpacity>
            </View>
            <View style={styles.profileOptionsContainer}>
                <TouchableOpacity style={styles.profileOptionsButton}>
                    <View style={styles.profileOptionsButtonLeft}>
                    <MaterialCommunityIcons name="account-group-outline" size={24} color="#7871FC" />
                        <Text style={{fontSize: 16, color: "#fff",  fontFamily: 'Poppins_400Regular', marginLeft: 10}}>Join Halt family</Text>
                    </View>
                    <View style={styles.profileOptionsButtonRight}>
                    <AntDesign name="right" size={24} color="#7871FC" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileOptionsButton}>
                    <View style={styles.profileOptionsButtonLeft}>
                    <AntDesign name="adduser" size={24} color="#7871FC" />
                    <Text style={{fontSize: 16, color: "#fff", fontFamily: 'Poppins_400Regular', marginLeft: 10}}>Invite your friend</Text>
                    </View>
                    <View style={styles.profileOptionsButtonRight}>
                    <AntDesign name="right" size={24} color="#7871FC" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileOptionsButton}>
                    <View style={styles.profileOptionsButtonLeft}>
                    <Entypo name="instagram" size={24} color="#7871FC" />
                        <Text style={{fontSize: 16, color: "#fff", fontFamily: 'Poppins_400Regular',marginLeft: 10}}>Follow us on instagram</Text>
                    </View>
                    <View style={styles.profileOptionsButtonRight}>
                    <AntDesign name="right" size={24} color="#7871FC" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileOptionsButton}>
                    <View style={styles.profileOptionsButtonLeft}>
                    <MaterialIcons name="star-rate" size={24} color="#7871FC" />
                        <Text style={{fontSize: 16, color: "#fff", fontFamily: 'Poppins_400Regular', marginLeft: 10}}>Rate us</Text>
                    </View>
                    <View style={styles.profileOptionsButtonRight}>
                    <AntDesign name="right" size={24} color="#7871FC" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileOptionsButton} onPress={onLogout}>
                    <View style={styles.profileOptionsButtonLeft}>
                    <FontAwesome name="power-off" size={24} color="#7871FC" />
                        <Text style={{fontSize: 16, color: "#fff", fontFamily: 'Poppins_400Regular', marginLeft: 10}}>Logout</Text>
                    </View>
                    <View style={styles.profileOptionsButtonRight}>
                    <AntDesign name="right" size={24} color="#7871FC" />
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                    animation={"slide"} transparent={true} visible={modal} 
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Text style={styles.modalText}>Profile Updated!</Text>
                            <Pressable style={styles.modalButton}><Text style={styles.modalButtonText} onPress={closeModal}>Ok</Text></Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <Tabs navigation={navigation} route={route} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 80,
        backgroundColor: "#1A1F33",
        position: "relative",
        shadowColor: '#7871FC',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 15,
        zIndex: 999,
    },
    headerContainerLeft: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        left: 15,
    },
    profileImage: {
        flex: 0.5,
        left: 50,
        width: 60,
        height: 60,
        resizeMode: "contain"
    },
    headerText: {
        color: "#fff",
        marginLeft: 10,
        fontSize: 18,
        fontFamily: 'Poppins_400Regular',
    },
    profileBlock:{
        padding: 35,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#354173"
    },
    profileBlockImage: {
        width: 130,
        height: 130,
        resizeMode: "contain"
    },
    textInput: {
        width: 300,
        marginBottom: 10,
        height: 50,
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#EBEFFF",
        color: "#EBEFFF",
        fontFamily: 'Poppins_400Regular',
    },
    primaryButton: {
        width: 150,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        height: 50,
        borderRadius: 10,
        marginBottom: 10,
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
    profileOptionsContainer: {
        flex: 1,
        backgroundColor: "#1A1F33",
        padding: 15,
    },
    profileOptionsButton: {
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFFF",
        color: "#EBEFFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 5
    },
    profileOptionsButtonLeft: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
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
    },
    modalButtonText: {
        color: "#C59F1A",
        fontFamily: 'Poppins_400Regular',
    },


})
