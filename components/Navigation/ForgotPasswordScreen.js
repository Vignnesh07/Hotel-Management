import React, {Component} from "react";
import {Alert, Text, View, StyleSheet, Modal, Dimensions, TouchableOpacity, StatusBar, Image, useWindowDimensions, TextBase} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../const/color'
import { TextInput } from "react-native-gesture-handler";

const showAlert = () =>
  Alert.alert(
    "Password Reset",
    "A reset link has been sent to your email !",
    [
        { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

const ForgotPasswordScreen = ({navigation, value, setValue}) => {
    return(
        <View style={styles.container}>
            <View style={styles.backNav}>
                <Ionicons
                    name="chevron-back-sharp"
                    size={40}
                    color='black'
                    onPress={navigation.goBack}
                />
            </View>

            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <Image style={styles.logo} source={require('../../assets/img/Logo.png')} />
            <View>
                    <Text style={{ 
                        fontSize:30, 
                        paddingLeft: 15, 
                        marginTop: 50, 
                        color: 'black', 
                        fontWeight: 'bold'}}>Unfortunate Things Happen
                    </Text>
                    <Text style={{ 
                        fontSize:15, 
                        marginTop:5,
                        paddingLeft: 14,  
                        color: Colors.grey}}>Enter your VigNex account. We’ll send you instructions 
                        to reset your password.
                    </Text>
                </View>

            <View style={styles.inputContainer} >
                <TextInput  placeholder="Email Address" keyboardType={'email-address'} value={value} onChangeText={setValue}  style={styles.input} />
            </View>

            <View style={styles.forgottenButton}>
                <TouchableOpacity onPress={showAlert}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color: Colors.white, fontSize: 20, fontWeight: 'bold'}}>Reset Password</Text>
                    </View>
                </TouchableOpacity>    
            </View>
        </View>

    );
};

const styles = StyleSheet.create({

    container:{
        backgroundColor: Colors.white, 
        flex: 1,
    },
    logo:{
        marginTop: 20,
        alignSelf: 'center',
        height: 180,
        width: 180,
    },
    backNav:{
        marginTop: 20,
        marginHorizontal: 15,
        marginBottom: 5,
    },
    inputContainer:{
        marginTop: 30,
        alignSelf: 'center',
        paddingLeft: 20,
        height: 50,
        width: 330,
        elevation: 25,
        borderRadius: 30,
        backgroundColor: Colors.white,
        borderWidth: 0,

    },
    forgottenButton:{
        height: 50,
        width: 330,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        backgroundColor: Colors.primary,
        borderRadius: 15, 
    },
})

export default ForgotPasswordScreen;