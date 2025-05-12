import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import { sidebarStyles } from './Providers/Styles';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import SignupScreen from './screens/SignupScreen';
import SettingsScreen from './screens/SettingsScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MoreScreen from './screens/MoreScreen';
import TermsScreen from './screens/TermsScreen';
import { useSelector } from 'react-redux';
import TabsScreen from './screens/TabsScreen';
import { ThemeProvider } from './context/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import MeditateScreen from './screens/MeditateScreen';
import CompanionScreen from './screens/CompanionScreen';
import AboutScreen from './screens/AboutScreen';
import PlayerScreen from './screens/PlayerScreen';
import MoodAnalyticsScreen from './screens/MoodAnalyticsScreen';
import ActivityScreen from './screens/ActivityScreen';
import TappingGame from './Providers/TappingGame';
import BalloonBreather from './Providers/Games/BalloonBreather';
import ZenGarden from './Providers/Games/ZenGarden';
import FocusFlower from './Providers/Games/FocusFlower';
import AiChatScreen from './screens/AiChatScreen';
import CrisisSupportScreen from './screens/CrisisSupportScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SafeContactsScreen from './screens/SafeContactsScreen';
import BlogPage from './screens/BlogPage';
import DetailScreen from './screens/DetailScreen';
import MoodAnalyzer from './screens/MoodAnalyzer';


// Create a custom drawer content component
const CustomDrawerContent = ({ navigation, state }) => {
  const isScreenSelected = (routeName:any) => state.routes[state.index].name === routeName;
  const userData = useSelector((state:any) => state.user.userData);

  return(
    <ImageBackground
        source={require('./src/assets/sideNav.png')}
        style={sidebarStyles.backgroundImage}>
    <View style={sidebarStyles.profileContainer}>
      <Image
        source={require('./src/assets/logo.png')}
        style={sidebarStyles.profileImage}
      />
      <View>
      {/* userData ? userData.riderFirstName: */}
        <Text style={sidebarStyles.username}>{userData ? userData.name : 'Welcome User'}</Text>
      </View>
    </View>

    {/* Drawer items */}
    <View style={{paddingLeft:10, marginTop:'10%',}}>
   
    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('About')}>
      <AntDesign name="hourglass" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>Who we are</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Terms')}>
      <AntDesign name="appstore-o" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>Terms & Conditions</Text>
    </TouchableOpacity>
    

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Settings')}>
      <AntDesign name="setting" size={18} color={'#ee6dca'} />
      <Text style={sidebarStyles.optionText}>Settings</Text>
    </TouchableOpacity>

  </View>
  </ImageBackground>
  )};


const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="Splash" 
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Signup" component={SignupScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="More" component={MoreScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="Terms" component={TermsScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />  
        <Drawer.Screen name="Tabs" component={TabsScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />  
        <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />  
        <Drawer.Screen name="Meditate" component={MeditateScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />  
        <Drawer.Screen name="Companion" component={CompanionScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />    
        <Drawer.Screen name="About" component={AboutScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Player" component={PlayerScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />     
        <Drawer.Screen name="Mood" component={MoodAnalyticsScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />  
        <Drawer.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />  
        <Drawer.Screen name="AIChat" component={AiChatScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />  
        <Drawer.Screen name="Crisis" component={CrisisSupportScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />  
        <Drawer.Screen name="Blog" component={BlogPage} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="Detail" component={DetailScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        <Drawer.Screen name="MoodAnalysis" component={MoodAnalyzer} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} /> 
        
        {/* Games */}
        <Drawer.Screen name="TappingGame" component={TappingGame} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />  
        <Drawer.Screen name="BalloonBreather" component={BalloonBreather} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="ZenGarden" component={ZenGarden} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="FocusFlower" component={FocusFlower} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        
      </Drawer.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;