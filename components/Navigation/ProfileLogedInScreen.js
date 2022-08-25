import React, {Component, useState, useEffect} from "react";
import {SafeAreaView, Alert, Text, View, StyleSheet, Modal, Dimensions, TouchableOpacity, StatusBar, Image, useWindowDimensions, TextBase} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { signOut, sendEmailVerification } from "firebase/auth";
import { Overlay } from "@rneui/base";
import { collection, getDocs, where, query } from "firebase/firestore/lite";

import FormSuccess from "../shared/formSuccess";
import Loader from '../shared/loader'
import Colors from '../const/color'
import { authentication, firebaseDB } from '../../firebase/firebase-config';

const ProfileLogedInScreen = ({navigation}) => {
    const [uid, setUid] = useState("");
    const [loader, setLoader] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [OverlayText, setOverlayText] = useState("");
    const [popUpErr, setpopUpErr] = useState(false);

    // Sets the current user id
    useEffect(() => {
        setLoader(true);
        setTimeout(function () {
            setUid(authentication.currentUser.uid);
        }, 200);
    }, []);

    // Retrieves user data once uid has been set
    useEffect(() => {
        getUserData();
        setLoader(false);
    }, [uid]);

    // Function to retrieve user data from Firestore
    const getUserData = async () => {
        const userQuery = query(collection(firebaseDB, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
            setUserData({
                name: doc.data().name,
                email: doc.data().email,
                phoneNo: doc.data().phoneNo,
            });
        });
    }

    // Function to logout user
    const logOut = () => {
        signOut(authentication)
        .catch((e) => alert(e.message))
    } 

    // Function to verify user email
    const verifyEmail = () => {
        setLoader(true);
        sendEmailVerification(authentication.currentUser)
        .then(() => {
            setLoader(false);
            setOverlayText("Successfully sent verification link to your email. Please login to cocntinue");
            setpopUpErr(false);
            setIsVisible(true);
        })
        .catch((e) => {
            setLoader(false);
            setOverlayText(e.message);
            setpopUpErr(true);
            setIsVisible(true);
        });
    }

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phoneNo: '',
        uid: '',
    });

    return(
        <>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{marginTop: 25, marginHorizontal: 16,}} />
                    
                    {/* User profile picture */}
                    <View style={{ alignSelf: "center" }}>
                        <View >
                            <Image source={require('../../assets/img/profilepic.png')}  style={styles.profilePic} resizeMode="center"/>
                        </View>
                    </View>

                    {/* Greetings */}
                    <View>
                        <Text style={{fontSize: 30, paddingLeft: 18, marginTop: 20, color: 'black', fontWeight: 'bold'}}> Greetings, {userData === null ? '' : userData.name}</Text>
                        <Text style={{fontSize:20, marginTop: 10, paddingLeft: 25, color: Colors.grey}}>Joined in 2022</Text>
                    </View>

                    {/* Verification badge */}
                    {
                        authentication.currentUser.emailVerified ?
                        (
                            <View style={{flexDirection:'row', paddingLeft:26, paddingTop: 20}} >
                                <Icon name="verified-user" size={30} color='#42A5F5' />
                                <Text style={{fontSize: 20, paddingLeft: 20, color: Colors.primary}}> Verified </Text>
                            </View>
                        )
                        :
                        (
                            <TouchableOpacity onPress={verifyEmail}>
                                <View style={{flexDirection:'row', paddingLeft:26, paddingTop: 20}} >
                                    <Icon name="verified-user" size={30} color='red' />
                                    <Text style={{fontSize: 20, paddingLeft: 20, color: 'red'}}> Unverified </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }

                    {/* Divider */}
                    <View style={{marginTop: 20}}>
                        <Text style={styles.line}> ───────────────────────────────────── </Text>
                    </View>

                    {/* User details */}
                    <View>
                        <Text style={{fontSize:30, paddingLeft: 18, marginTop: 20, color: 'black', fontWeight: 'bold'}}> About </Text>
                        <Text style={{fontSize:16, marginTop: 10, paddingLeft: 27, color: 'black'}}>{userData.email}</Text>
                        <Text style={{fontSize:16, marginTop: 10, paddingLeft: 27, color: 'black'}}>{userData.phoneNo}</Text>
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
                            <Text style={{fontSize: 17, paddingLeft: 20, color: 'black'}}> Works at Pionneers Sdn Bhd </Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={styles.line}> ───────────────────────────────────── </Text>
                    </View>

                    {/* User profile details */}
                    <View>
                        <Text style={{fontSize:30, paddingLeft: 18, marginTop: 20, color: 'black', fontWeight: 'bold'}}>Profile</Text>
                        <View style={{flexDirection:'row', paddingLeft:27, paddingTop: 15}} >
                            <Icon name="check" size={21} color='black' />
                            <Text style={{fontSize: 17, paddingLeft: 20, color: 'black'}}> Email Address </Text>
                        </View>
                        <View style={{flexDirection:'row', paddingLeft:27, paddingTop: 15}} >
                            <Icon name="check" size={21} color='black' />
                            <Text style={{fontSize: 17, paddingLeft: 20, color: 'black'}}> Phone Number </Text>
                        </View>
                    </View>

                    {/* Logout button */}
                    <View>
                        <TouchableOpacity onPress={logOut} style={styles.logOutButton}>
                            <Text style={{color: "white"}}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                { loader ? <Loader/> : null }

                {/* Overlay for email verification */}
                <Overlay isVisible={isVisible} overlayStyle={{backgroundColor: "white", borderColor: "white", borderRadius: 20}} onBackdropPress={() => setIsVisible(false)}>
                    <FormSuccess errorBtn={() => setIsVisible(false)} successBtn={() => setIsVisible(false)} text={OverlayText} error={popUpErr} />
                </Overlay>
            </SafeAreaView>
        </>
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
        marginTop: 40,
        marginBottom: 40,
        marginHorizontal: 20,
        borderRadius: 15, 
        backgroundColor:"black", 
    },
    line:{
        textAlign: 'center'
    }
})


export default ProfileLogedInScreen;