import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setuser } from "../reducers/userReducer"
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import {collection, doc, setDoc, getDoc } from 'firebase/firestore';


SplashScreen.preventAutoHideAsync();

export default function Login({navigation}) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("")
  const [error, setError] = useState("");
  const [initialLoginCheck, setInitialLoginCheck] = useState(false);
  const dispatch = useDispatch();
  const[fname, setFname] = useState("");
  const[lname, setLname] = useState("")

  const checkCredentials = async() => {
    try{
      const value = await AsyncStorage.getItem("login-key");
      if(value!=null){
        const loginDetails = JSON.parse(value)
        setEmail(loginDetails.email);
        setPassword(loginDetails.passsword)
        try{
          await signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.passsword).then(async(userData) => {
            if(userData){
              setEmail("");
              setPassword("");
              setUser(userData?.user)
              const userProfile = await getDoc(doc(db, "halt", userData?.user?.uid))
              userData["user"]["profile"] = userProfile.data().profile
              dispatch(setuser(userData?.user))
              navigation.navigate('home')
            }
          });
        }
        catch(err){
          const errorMessage = err?.message.toString();
          if(errorMessage === "Firebase: Error (auth/user-not-found)."){
            setEmail("")
            setPassword("")
            setIsLoginForm(false)
          }
        }
      }
      else{
        setEmail("")
        setPassword("")
        setIsLoginForm(false)
      }
    }catch(e){
      console.log(e);
    }
  }

  const loadFonts = async () =>
  await Font.loadAsync({
    'Poppins_400Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        loadFonts()
        checkCredentials()
        setInitialLoginCheck(true)   
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, [])


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const switchLoginContainer = (e) => {
    e.preventDefault();
    setIsLoginForm(!isLoginForm);
    setEmail("");
    setPassword("");
    setError("")
  }

  const setCredentials = async(email, passsword) => {
    try{
      const jsonValue = JSON.stringify({email, passsword});
      await AsyncStorage.setItem("login-key", jsonValue);
    }
    catch(e){
      console.log("async storage failed");
    }
  }

  const onLoginWithEmailAndPassword = async(e) => {
    e.preventDefault();
    setError("");
    if(email.length===0 || password.length===0 || email.trim()==="" || password.trim()==="" || !email.includes("@")){
      setError("Invalid Email or Password!")
    }
    else{
      await signInWithEmailAndPassword(auth, email, password).then(async(userData) => {
        if(userData){
          setCredentials(email, password);
          setEmail("");
          setPassword("");
          setUser(userData?.user)
          const userProfile = await getDoc(doc(db, "halt", userData?.user?.uid))
          userData["user"]["profile"] = userProfile.data().profile
          console.log(userData)
          dispatch(setuser(userData?.user))
          navigation.navigate('home')
        }
      }).catch((err) => {
        const errorMessage = err?.message.toString();
        if(errorMessage === "Firebase: Error (auth/wrong-password).")
          setError("Incorrect Password")
        else if(errorMessage === "Firebase: Error (auth/user-not-found).")
          setError("Invalid Email and Password")  
      })
    }
  }

  const onSignUpWithEmailAndPassword = (e) => {
    e.preventDefault();
    setError("");
    if(email.length===0 || password.length===0 || email.trim()==="" || password.trim()==="" || !email.includes("@")){
      setError("Invalid Email or Password!")
    }
    else{
      createUserWithEmailAndPassword(auth, email, password).then(async(userData) => {
        if(userData){
          setUser(userData?.user)
          try{
          await setDoc(doc(collection(db, "halt"), userData?.user?.uid), {
            profile: {
              "fname": fname,
              "lname": lname,
              "email": email,
              "uid": userData?.user?.uid
            },
            emotions: {},
            activities: {}
          })
          userData["user"]["profile"] = {
            "fname": fname,
            "lname": lname,
            "email": email,
            "uid": userData?.user?.uid
          }
          setEmail("");
          setPassword("");
          setFname(""); 
          setLname("");
        }
          catch(err){
            console.log(err)
            setEmail("");
            setPassword("");
            setFname(""); 
            setLname("");
          }
          dispatch(setuser(userData?.user))
          navigation.navigate('home')
        }
      }).catch((err) => {
        const errorMessage = err?.message.toString();
        if(errorMessage === "Firebase: Error (auth/email-already-in-use).")
          setError("Email already in use!")
        if(errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password).")
          setError("Password should be at least 6 characters!")  
      })
    }
    
  }
  return (
      <SafeAreaView style={{flex: 1}} onLayout={onLayoutRootView}>
        <StatusBar style='light' backgroundColor= '#1A1F33' />
        <ScrollView style={styles.loginContainer} keyboardShouldPersistTaps={'handled'}>
          <View style={styles.loginContainerTop}>
            <Image source={require('../assets/logo-large.png')} style={styles.loginImage}/>
            <Text style={styles.loginTopHeader}>Short digital activities for emotional wellbeing</Text>
          </View>
          <View style={styles.loginContainerBottom}>
            <View style={styles.loginSwitchContainer}>
              <TouchableOpacity style={isLoginForm? styles.loginSwitchButton : styles.signupSwitchnButton} onPress={switchLoginContainer}>
                <Text style={isLoginForm ? styles.loginSwitchText: styles.signupSwitchText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={isLoginForm ? styles.signupSwitchnButton : styles.loginSwitchButton} onPress={switchLoginContainer}>
                <Text style={isLoginForm ? styles.signupSwitchText : styles.loginSwitchText}>Signup</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginForm}>
              <Text style={styles.loginFormHeader}>{isLoginForm ? "Please login to continue" : "Press signup to continue"}</Text>
              {!isLoginForm &&
                <>
              <View style={styles.loginFormInputContainer}>
                <Text style={styles.loginFormLabel}>First Name:</Text>
                <TextInput placeholder='John' style={styles.loginFormTextInput} value={fname} onChangeText={setFname}/>
              </View>
              <View style={styles.loginFormInputContainer}>
                <Text style={styles.loginFormLabel}>Last Name:</Text>
                <TextInput placeholder='Doe' style={styles.loginFormTextInput} value={lname} onChangeText={setLname}/>
              </View>
              </>
              }
              <View style={styles.loginFormInputContainer}>
                <Text style={styles.loginFormLabel}>Email:</Text>
                <TextInput placeholder='johndoe@email.com' style={styles.loginFormTextInput} value={email} onChangeText={setEmail}/>
              </View>
              <View style={styles.loginFormInputContainer}>
                <Text style={styles.loginFormLabel}>Password:</Text>
                <TextInput placeholder='*******' secureTextEntry={true} style={styles.loginFormTextInput} value={password} onChangeText={setPassword}/>
              </View>
              {error.length!==0 ?
                <Text style={styles.errorText}>{error}</Text>: <></>
              }
              {
                isLoginForm ? 
                <TouchableOpacity style={styles.loginFormButton} onPress={onLoginWithEmailAndPassword}>
                  <Text style={styles.loginFormButtonText}>Login</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.signupFormButton} onPress={onSignUpWithEmailAndPassword}>
                  <Text style={styles.loginFormButtonText}>Signup</Text>
                </TouchableOpacity>
              }
              <View style={styles.loginFormFooter}>
                <Text style={styles.loginFormFooterText}>{isLoginForm ? "Don’t have an account?" : "Already have an account"}</Text>
                {isLoginForm ?
                <TouchableOpacity onPress={switchLoginContainer}>
                  <Text style={styles.loginFormFooterButtonText}>Signup</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={switchLoginContainer}>
                  <Text style={styles.loginFormFooterButtonText}>Login</Text>
                </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#1A1F33",
  },
  loginContainerTop: {
    flex: 0.45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1F33",
  },
  loginImage: {
    marginTop: 95,
    flex: 1,
    width: 205,
    height: 88,
    resizeMode: "contain",
  },
  loginTopHeader: {
    fontSize: 12,
    textAlign: 'center',
    color: "#7871FC",
    lineHeight: 18,
    marginTop: 14,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 90,
  },
  loginContainerBottom: {
    flex: 0.55,
    backgroundColor: "#1A1F33",
  },
  loginSwitchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  loginSwitchButton: {
    flex: 0.5,
    padding: 25,
    backgroundColor: "#EBEFFF",
  },
  signupSwitchnButton: {
    flex: 0.5,
    padding: 25,
    backgroundColor: "#CBCFE0",
  },
  loginSwitchText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    fontFamily: 'Poppins_400Regular',
  },
  signupSwitchText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
  },
  loginForm: {
    flex: 1,
    backgroundColor: "#EBEFFF"
  },
  loginFormHeader:{
    marginTop: 32,
    color: "#7871FC",
    textAlign: "center",
    marginBottom: 18,
    fontFamily: 'Poppins_400Regular',
  },
  loginFormInputContainer: {
    flex: 1,
    paddingLeft: 33,
    paddingRight: 33,
    marginBottom: 18,
  },
  loginFormLabel: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  loginFormTextInput: {
    backgroundColor: "#CBCFE0",
    padding: 20,
    fontFamily: 'Poppins_400Regular',
    borderRadius: 10,
  },
  loginFormButton: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: 130,
    padding: 15,
    backgroundColor: "#868686",
    borderRadius: 10,
    marginTop: 15,
  },
  signupFormButton: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: 130,
    padding: 15,
    backgroundColor: "#C59F1A",
    borderRadius: 10,
    marginTop: 15,
  },
  loginFormButtonText: {
    flex: 1,
    textAlign: "center",
    color: "#EBEFFF",
    fontFamily: 'Poppins_400Regular',
  },
  loginFormFooter: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    marginBottom: 20,
  },
  loginFormFooterText: {
    marginRight: 3,
    fontFamily: 'Poppins_400Regular',
  },
  loginFormFooterButtonText: {
    color: "#7871FC",
    textDecorationLine: "underline",
    fontFamily: 'Poppins_400Regular',
  },
  errorText: {
    paddingLeft: 40,
    paddingRight: 40,
    color: "red",
    fontFamily: 'Poppins_400Regular',
    fontSize: 12
  }
});