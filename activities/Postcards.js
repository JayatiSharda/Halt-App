import { useEffect, useRef, useState } from "react";
import {ScrollView, View, StyleSheet, Text, Pressable, Image, TextInput, TextInputBase, TouchableOpacity, ImageBackground, PixelRatio } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';



export default function Postcards({navigation, route}){
    const {emotion} = route.params
    const postCardRef = useRef();
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const sound = useSelector((state) => state.sound.sound.current)
    const [isPauseMusic, setIsPauseMusic] = useState(true)
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const onPlayPauseMusic = () => {
        if(isPauseMusic){
            sound.stopAsync();
            setIsPauseMusic(!isPauseMusic);
        }
        else{
            sound.playAsync();
            setIsPauseMusic(!isPauseMusic);
        }
    }
    const showPreview = () => {
        if(name!=="" && name.trim()!=="" && title!=="" && title.trim()!=="" && message!=="" && message.trim()!=="" && image!==null)
            setIsPreviewMode(!isPreviewMode)
    }

    const downloadImage = async() => {
        const result = await postCardRef.current.capture().then((res) => {
            Sharing.isAvailableAsync().then(() => {
                Sharing.shareAsync((res)).then((data) => {
                    navigation.navigate("saveRecords", {emotion: emotion});
                })
            })
        }).catch((err) => console.log(err))
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.container}>
                <View style={{flex: 1, padding: 20}}>
                    <View style={styles.activityHeaderContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image style={styles.backButtonImage} source={require("../assets/arrow_back.png")}/>
                        </Pressable>
                        <Pressable onPress={onPlayPauseMusic}>
                           {isPauseMusic ? <Image style={styles.musicPlayPauseImage} source={require("../assets/playMusic.png")}/> : <Image style={styles.musicPlayPauseImage} source={require("../assets/pauseMusic.png")}/> } 
                        </Pressable>
                    </View>
                    {!isPreviewMode ?
                    <>
                    <View style={styles.postCardTemplateContainer}>
                        <Text style={styles.subHeader}>Let your heart write for your loved ones...</Text>
                        <TextInput placeholder="Enter your name" style={styles.emailInput} onChangeText={setName}/>
                        <View style={styles.postCardTemplateBox}>
                            <TextInput placeholder="Hello John," onChangeText={setTitle}/>
                            <TextInput placeholder="Enter your message" multiline={true} numberOfLines={30} style={styles.postCardTemplateMessageInput} onChangeText={setMessage}/>
                            <TouchableOpacity onPress={pickImage} style={styles.postcardImagePicker}><Text>Pick a photo that you want to add in post card</Text></TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.primaryButton} onPress={showPreview}>
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity>
                    </>
                    :
                    <>
                    <ViewShot ref={postCardRef} options={{ format: "jpg", quality: 0.9 }}>
                        <ImageBackground source={require("../assets/postcardBorder.png")} resizeMode="cover" style={styles.postCardBorder}>
                            <ImageBackground source={require("../assets/postcard.jpg")} resizeMode="cover" >
                                <View style={styles.postCardTemplate}>
                                    <View style={styles.postCardTemplateLeft}>
                                        <Text style={styles.title}>{title}</Text>
                                        <Text style={styles.message}>{message}</Text>
                                        <Text style={styles.footerText}>Your's Lovingly,</Text>
                                        <Text style={styles.footerText}>{name}</Text>
                                    </View>
                                    <View style={styles.postCardTemplateRight}>
                                        <Image source={require("../assets/postcardSticker.png")} style={styles.postCardSticker} />
                                        <View style={styles.postcardImageBorder}>
                                            {image && <Image source={{uri: image}} style={styles.rightImage} /> }
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </ImageBackground>
                    </ViewShot>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.iconButton} onPress={showPreview}><FontAwesome name="pencil" size={26} color="black"/></TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={downloadImage}><FontAwesome name="share-alt" size={26} color="black" /></TouchableOpacity>
                    </View>
                    </>
                    }
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
    postCardTemplateContainer: {
        flex: 1,
        flexDirection: "column",
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
    postcardImagePicker: {
        flex: 1,
        backgroundColor: "#D9D9D9",
        padding: 10,
        borderRadius: 10,
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
    emailInput: {
        flex: 1,
        backgroundColor: "#fff",
        color: "#000",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontFamily: 'Poppins_400Regular',
    },
    postCardTemplateBox: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
    },
    postCardTemplateMessageInput: {
        marginTop: 10,
        height: 300,
        textAlignVertical: "top",
        fontFamily: 'Poppins_400Regular',
    },
    postCardBorder: {
        flex: 1,
        padding: 10,
        marginTop: 100,
    },
    postCardTemplate: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        padding: 25,
        backgroundColor: "rgba(241, 234, 227, 0.7)",
        borderRadius: 10,
        minHeight: 200,
    },
    postCardTemplateLeft: {
        flex: 0.6,
    },
    postCardTemplateRight: {
        flex: 0.4,
        alignItems: "center",
        justifyContent: "center"
    },
    postcardImageBorder: {
        flex: 1,
        width: "100%",
        backgroundColor: "#354173",
        alignItems: "center",
        justifyContent: "center"
    },
    rightImage: {
        flex: 1,
        width: "80%",
        resizeMode: "contain",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        fontStyle: "italic",
        fontFamily: 'Poppins_400Regular',
    },
    message: {
        fontSize: 11,
        marginBottom: 10,
        fontStyle: "italic",
        fontFamily: 'Poppins_400Regular',
    },
    footerText: {
        fontSize: 11,
        marginBottom: -2,
        fontStyle: "italic",
        fontFamily: 'Poppins_400Regular',
    },
    postCardSticker: {
        position: "absolute",
        top: -20,
        right: -20,
        width: 32,
        height: 32,
        resizeMode: "contain",
        zIndex: 9
    },
    iconButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D9D9D9"
    },
    buttonContainer: {
        flex: 1,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }

})