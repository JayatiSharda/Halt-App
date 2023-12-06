import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import store from './store'
import { Provider } from 'react-redux'
import EmotionsMeter from './screens/EmotionsMeter';
import Emotions from './screens/Emotions';
import EmotionsList from './screens/EmotionsList';
import Playlist from './screens/Playlist';
import Activities from  './screens/Activities';
import Journalifying from './activities/Journalifying';
import Hattricks from './activities/Hattricks';
import SaveRecords from './screens/SaveRecords';
import Stretchout from './activities/Stretchout';
import Braindump from './activities/Braindump';
import Postcards from './activities/Postcards';
import SeeSenseHear from './activities/SeeSenseHear';
import OldisGold from './activities/OldisGold';
import Records from './screens/Records';
import Mantra from './screens/Mantra';
import CreativeClue from './activities/CreativeClue';
import HideOut from './activities/HideOut';
import WittyWordsmith from './activities/WittyWordsmith';
import ClarityQuest from './activities/ClarityQuest';
import ComfortCorner from './activities/ComfortCorner';
import HumourMe from './activities/HumourMe';
import ZeninTen from './activities/ZeninTen';
import Ambiences from './screens/Ambiences';
import Profile from './screens/Profile';
import EmotionsMeterEnd from './screens/EmotionsMeterEnd';
import Breather from './screens/Breather';
import About from './screens/About';
import EmbracetheBurn from './activities/EmbracetheBurn';

const Stack = createNativeStackNavigator();

export default function App() {
  const option = {
    headerStyle: {
      backgroundColor: '#1A1F33',
      position: "relative",
      shadowColor: '#7871FC',
      shadowOffset: {width: 10, height: 10},
      shadowOpacity: 0.7,
      shadowRadius: 10,
      elevation: 15,
      zIndex: 999,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login" screenOptions={option}>
          <Stack.Screen name="login" component={Login} options={{headerShown:false}} />
          <Stack.Screen name="home" component={Home} options={{headerShown:false}} />
          <Stack.Screen name="emotionsList" component={EmotionsList} options={{title: "Mood"}} />
          <Stack.Screen name="emotionsMeter" component={EmotionsMeter} options={{title: "Emotional Meter"}} />
          <Stack.Screen name="emotions" component={Emotions} options={{title: "Emotions"}} />
          <Stack.Screen name="playlist" component={Playlist} options={{title: "Soundscapes"}} />
          <Stack.Screen name="activities" component={Activities} options={{title: "Activities"}} />
          <Stack.Screen name="emotionsmeterend" component={EmotionsMeterEnd} options={{title: "Emotional Meter"}} />
          <Stack.Screen name="about" component={About} options={{title: "About Mantra"}} />
          <Stack.Screen name="records" component={Records} options={{headerShown:false}} />
          <Stack.Screen name="mantra" component={Mantra} options={{headerShown:false}} />
          <Stack.Screen name="ambiences" component={Ambiences} options={{headerShown:false}} />
          <Stack.Screen name="profile" component={Profile} options={{headerShown:false}} />
          <Stack.Screen name="breather" component={Breather} options={{headerShown:false}} />

          <Stack.Screen name="Journalifying" component={Journalifying} options={{headerShown:false}} />
          <Stack.Screen name="Hattricks" component={Hattricks} options={{headerShown:false}} />
          <Stack.Screen name="Stretchout" component={Stretchout} options={{headerShown:false}} />
          <Stack.Screen name="Braindump" component={Braindump} options={{headerShown:false}} />
          <Stack.Screen name="Postcards" component={Postcards} options={{headerShown:false}} />
          <Stack.Screen name="SeeSenseHear" component={SeeSenseHear} options={{headerShown:false}} />
          <Stack.Screen name="OldisGold" component={OldisGold} options={{headerShown:false}} />
          <Stack.Screen name="CreativeClue" component={CreativeClue} options={{headerShown:false}} />
          <Stack.Screen name="HideOut" component={HideOut} options={{headerShown:false}} />
          <Stack.Screen name="WittyWordsmith" component={WittyWordsmith} options={{headerShown:false}} />
          <Stack.Screen name="EmbracetheBurn" component={EmbracetheBurn} options={{headerShown:false}} />
          <Stack.Screen name="ClarityQuest" component={ClarityQuest} options={{headerShown:false}} />
          <Stack.Screen name="ComfortCorner" component={ComfortCorner} options={{headerShown:false}} />
          <Stack.Screen name="HumourMe" component={HumourMe} options={{headerShown:false}} />
          <Stack.Screen name="ZeninTen" component={ZeninTen} options={{headerShown:false}} />
          <Stack.Screen name="saveRecords" component={SaveRecords} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}