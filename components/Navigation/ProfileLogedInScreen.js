import React, {Component} from "react";
import {Alert, Text, View, StyleSheet, Modal, Dimensions, TouchableOpacity, StatusBar, Image, useWindowDimensions, TextBase} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../const/color'
import { TextInput } from "react-native-gesture-handler";

const ProfileLogedInScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <Text> Profile loged in </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text style={{ 
                            fontSize:13, 
                            marginTop: 12,
                            paddingLeft: 4,  
                            color: 'black',
                            fontWeight: 'bold',
                            textDecorationLine: 'underline'}}>Log Out
                </Text>
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