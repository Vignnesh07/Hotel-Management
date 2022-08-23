import Colors from './components/const/color';

import HomeScreen from './components/screens/HomeScreen';
import BookingScreen from './components/screens/BookingScreen';
import WishlistScreen from './components/screens/WishlistScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import HotelDetailScreen from './components/screens/HotelDetailScreen';
import AllHotels from './components/screens/AllHotels';

import LogInScreen from './components/Navigation/LogInScreen';
import SignUpScreen from './components/Navigation/SignUpScreen'; 
import ForgotPasswordScreen from './components/Navigation/ForgotPasswordScreen';
import ProfileLogedInScreen from './components/Navigation/ProfileLogedInScreen';

import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {Component} from 'react';
import {StatusBar, Text, Dimensions} from 'react-native';
import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {LogBox} from 'react-native';
import { and } from 'react-native-reanimated';
LogBox.ignoreLogs (['EventEmitter.removeListener']);


const StackNav = createStackNavigator();
const Tab = createBottomTabNavigator ();
const fullScreenWidth = Dimensions.get('window').width

function HomeStackScreen(){
  return(
    <StackNav.Navigator>
      <StackNav.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{headerShown: false}}
      />
      <StackNav.Screen  
          name="HotelDetail" 
          component={HotelDetailScreen} 
          options={{headerShown: false}}
      />
      <StackNav.Screen  
          name="AllHotels" 
          component={AllHotels} 
          options={{headerShown: true, headerTitle: '', headerShadowVisible: false,}}
      />
    </StackNav.Navigator>
  );
}

function ProfileStackScreen(){
  return(
    <StackNav.Navigator screenOptions={{headerShown:false}}  >
      <StackNav.Screen 
          name="Profile" 
          component={ProfileScreen} 
      />
      <StackNav.Screen 
          name="LogIn" 
          component={LogInScreen} 
      />
      <StackNav.Screen 
          name="SignUp" 
          component={SignUpScreen} 
      />
      <StackNav.Screen 
          name="Forgot" 
          component={ForgotPasswordScreen} 
      />
      <StackNav.Screen 
          name="ProfileLogedIn" 
          component={ProfileLogedInScreen} 
      />
    </StackNav.Navigator>
  );
}



export default class App extends Component {
  render(){
    return (
      <NavigationContainer >
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <Tab.Navigator
          initialRouteName={'TabHome'}
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: "black",
            // tabBarLabelStyle: {
            //   fontSize: 12,
            //   marginBottom: 13,
            // },
            tabBarStyle:{
              height:80,
              // borderRadius:20,
              // width: fullScreenWidth,
            },
            tabBarIcon: ({focused, color, size, padding}) => {
              let iconName;
              if (route.name === 'TabHome'){
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Bookings') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Wishlists') {
                iconName = focused ? 'bookmarks' : 'bookmarks-outline';
              } else if (route.name === 'TabProfile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }
              
              return ( <Ionicons 
                name={iconName}
                size={size}
                color={color}
                style={{paddingBottom: padding, marginBottom: 10, marginTop: 10}} 
                />
                
              );
            },
          })}
        >
          <Tab.Screen name="TabHome" component={HomeStackScreen} />
          <Tab.Screen name="Bookings" component={BookingScreen} />
          <Tab.Screen name="Wishlists" component={WishlistScreen} />
          <Tab.Screen
            name="TabProfile"
            component={ProfileStackScreen}
            options={({ route}) => ({
              tabBarStyle: ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                console.log(routeName)
                if (routeName === 'LogIn' || routeName === 'SignUp' || routeName === 'Forgot') {
                  return { display: "none" }
                }else{
                  return { height: 80}
                }
              })(route),
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
