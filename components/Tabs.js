import { StyleSheet, View, Text, Pressable } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native";

export default function Tabs({navigation, route}) {
  return (
    <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabIcon} onPress={() => navigation.navigate("home")}>
            <FontAwesome name="home" size={28} color={route.name === "home" ? "#7871FC" : "#424663"}  />
            <Text style={route.name === "home" ? styles.tabTextActive: styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabIcon} onPress={() => navigation.navigate("mantra")}>
            <FontAwesome5 name="spa" size={28} color={route.name === "mantra" ? "#7871FC" : "#424663"}  />
            <Text style={route.name === "mantra" ? styles.tabTextActive: styles.tabText}>Mantra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabIcon} onPress={() => navigation.navigate("records")}>
            <FontAwesome name="file-text" size={28} color={route.name === "records" ? "#7871FC" : "#424663"}  />
            <Text style={route.name === "records" ? styles.tabTextActive: styles.tabText}>Records</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabIcon} onPress={() => navigation.navigate("ambiences")}>
            <MaterialCommunityIcons name="playlist-music" size={28} color={route.name === "ambiences" ? "#7871FC" : "#424663"}  />
            <Text style={route.name === "ambiences" ? styles.tabTextActive: styles.tabText}>Ambiences</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: 80,
    borderStyle: "solid",
    borderTopColor: "#7871FC",
    borderTopWidth: 1,
    backgroundColor: "#1A1F33",
    position: "relative",
    shadowColor: '#7871FC',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 15,
    zIndex: 999,
  },
  tabIcon: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "#424663",
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
  },
  tabTextActive: {
    color: "#7871FC",
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
  }
});
