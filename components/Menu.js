import { Pressable } from "react-native";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

export default function Menu({navigation, route}) {
  const navigateToProfile = () => {
    navigation.navigate("profile")
  }
  const navigateToHome = () => {
    navigation.navigate("home")
  }
  return (
    <View style={styles.menuContainer}>
        <Pressable onPress={navigateToHome}><Image source={require('../assets/logo.png')} style={styles.logo}/></Pressable>
        <TouchableOpacity onPress={navigateToProfile} style={styles.userLogoButton}><Image source={require('../assets/user.png')} style={styles.userLogo}/></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
   menuContainer: {
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
    fontFamily: 'Poppins_400Regular',
  },

  menuText: {
    color: "#424663",
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },
  userLogoButton: {
    position: "absolute",
    right: 4,
  },
  userLogo:{
    width: 60,
    height: 60,
    resizeMode: "contain"
  }

});
