import React, {Component} from "react";

import {SafeAreaView, Alert, Text, View, StyleSheet, Modal, Dimensions, TouchableOpacity, StatusBar, Image, useWindowDimensions, TextBase} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, TextInput } from "react-native-gesture-handler";
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
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.editButton}>
                    <Icon name="more-vert" size={30} color="black"></Icon>
                </View>
                <View style={{ alignSelf: "center" }}>
                    <View >
                        <Image source={require('../../assets/img/profilepic.png')}  style={styles.profilePic} resizeMode="center"/>
                    </View>
                    
                </View>
                <View>
                    <Text style={{fontSize: 30, paddingLeft: 18, marginTop: 20, color: 'black', fontWeight: 'bold'}}> Hi, </Text>
                    <Text style={{fontSize:20, marginTop: 10, paddingLeft: 25, color: Colors.grey}}>Joined in 2022</Text>
                </View>
                <View style={{flexDirection:'row', paddingLeft:26, paddingTop: 20}} >
                    <Icon name="verified-user" size={30} color='red' />
                    <Text style={{fontSize: 20, paddingLeft: 20, color: Colors.primary}}> Identity Verified </Text>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={styles.line}> ───────────────────────────────────── </Text>
                </View>
                <View>
                    <Text style={{fontSize:30, paddingLeft: 18, marginTop: 20, color: 'black', fontWeight: 'bold'}}> About </Text>
                    <Text style={{fontSize:16, marginTop: 10, paddingLeft: 27, color: 'black'}}>Email</Text>
                    <View style={{flexDirection:'row', paddingLeft:27, paddingTop: 20}} >
                        <Ionicons name="home" size={21} color='black' />
                        <Text style={{fontSize: 17, paddingLeft: 20, color: 'black'}}> Lives in Klang, Selangor </Text>
                    </View>
                    <View style={{flexDirection:'row', paddingLeft:27, paddingTop: 15}} >
                        <Ionicons name="globe" size={21} color='black' />
                        <Text style={{fontSize: 17, paddingLeft: 20, color: 'black'}}> Speaks English, Bahasa Malaysia</Text>
                    </View>
                    <View style={{flexDirection:'row', paddingLeft:27, paddingTop: 15}} >
                        <Icon name="work" size={21} color='black' />
                        <Text style={{fontSize: 17, paddingLeft: 20, color: 'black'}}> Works at Pioneers Sdn Bhd </Text>
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={styles.line}> ───────────────────────────────────── </Text>
                </View>
                <View>
                    <Text style={{fontSize:30, paddingLeft: 18, marginTop: 20, color: 'black', fontWeight: 'bold'}}>Random Text</Text>
                    <View style={{flexDirection:'row', paddingLeft:27, paddingTop: 20}} >
                        <Icon name="check" size={21} color='black' />
                        <Text style={{fontSize: 17, paddingLeft: 20, color: 'black'}}> Identity </Text>
                    </View>
                    <View style={{flexDirection:'row', paddingLeft:27, paddingTop: 15}} >
                        <Icon name="check" size={21} color='black' />
                        <Text style={{fontSize: 17, paddingLeft: 20, color: 'black'}}> Email Address </Text>
                    </View>
                    <View style={{flexDirection:'row', paddingLeft:27, paddingTop: 15}} >
                        <Icon name="check" size={21} color='black' />
                        <Text style={{fontSize: 17, paddingLeft: 20, color: 'black'}}> Phone Number </Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={logOut}>
                        <Text style={{fontSize:20, marginTop: 80, marginBottom: 30, paddingLeft: 28, color: 'black', fontWeight: 'bold', textDecorationLine: 'underline'}}>Log Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.white, 
        flex: 1,
    },
    editButton:{
        marginTop: 15,
        marginHorizontal: 16,
        alignSelf: 'flex-end',
    },
    profilePic: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
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
    line:{
        textAlign: 'center'
    }
})


export default ProfileLogedInScreen;