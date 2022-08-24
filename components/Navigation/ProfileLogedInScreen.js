import React, {Component} from "react";
import {Alert, Text, View, StyleSheet, Modal, Dimensions, TouchableOpacity, StatusBar, Image, useWindowDimensions, TextBase} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";

import Colors from '../const/color'
import { authentication } from '../../firebase/firebase-config';

const ProfileLogedInScreen = ({navigation}) => {

    // Function to logout user
    const logOut = () => {
        signOut(authentication)
        .catch((e) => alert(e.message))
    } 

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <Text> Profile loged in </Text>
            <TouchableOpacity onPress={logOut}>
                <Text style={{fontSize:13, marginTop: 12, paddingLeft: 4, color: 'black', fontWeight: 'bold', textDecorationLine: 'underline'}}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container:{
        backgroundColor: Colors.white, 
        flex: 1,
    },
    logOutButton:{
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: Colors.primary,
        marginHorizontal: 20,
        borderRadius: 15, 
    },


})



export default ProfileLogedInScreen;