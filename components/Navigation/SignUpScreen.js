import React, {Component} from "react";
import {Text, View, StyleSheet, Modal, Dimensions, TouchableOpacity, StatusBar, Image, useWindowDimensions, TextBase} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../const/color'
import { TextInput } from "react-native-gesture-handler";

const SignUpScreen = ({navigation,value,setValue}) => {
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />


            <View style={styles.backNav}>
                <Ionicons
                    name="chevron-back-sharp"
                    size={40}
                    color='black'
                    onPress={navigation.goBack}
                />
            </View>
            <View>
                    <Text style={{ 
                        alignSelf: 'center',
                        fontSize:28, 
                        marginTop: 20, 
                        color: 'black', 
                        fontWeight: 'bold'}}>Let's Get You Registered !
                    </Text>
            </View>
            <View style={styles.inputContainer} >
                <TextInput  placeholder="Username" value={value} onChangeText={setValue}  style={styles.input} />
            </View>

            <View style={styles.inputContainer} >
                <TextInput  placeholder="Phone Number"  keyboardType={'phone-pad'} value={value} onChangeText={setValue}  style={styles.input} />
            </View>

            <View style={styles.inputContainer} >
                <TextInput  placeholder="Email Address" keyboardType={'email-address'} value={value} onChangeText={setValue}  style={styles.input} />
            </View>
            <View style={styles.inputContainer} >
                <TextInput  
                    placeholder="Password" 
                    value={value} 
                    onChangeText={setValue} 
                    secureTextEntry={true}
                    style={styles.input} />
            </View>
            <View style={styles.inputContainer} >
                <TextInput  
                    placeholder="Confirm Password" 
                    value={value} 
                    onChangeText={setValue} 
                    secureTextEntry={true}
                    style={styles.input} />
            </View>

            <View style={{flexDirection: 'row', paddingTop: 20, paddingLeft: 10}}>
                    <Text style={{fontSize:12, color: Colors.lightblack, paddingLeft: 28}}> By registering, you confirm that you accept our </Text>
                    <Text style={{fontSize:12, color: Colors.primary}}>Terms of Use </Text>
            </View>
            <View style={{flexDirection: 'row',paddingLeft: 10}}>
                    <Text style={{fontSize:12, color: Colors.lightblack , paddingLeft: 31}}>and</Text>
                    <Text style={{fontSize:12, color: Colors.primary}}> Privacy Policy. </Text>
                    
            </View>

            <View style={styles.signUpButton}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileLogedIn')}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color: Colors.white, fontSize: 20, fontWeight: 'bold'}}>Sign Up</Text>
                    </View>
                </TouchableOpacity>    
            </View>
            <View style={{flexDirection:'row', alignSelf: 'center'}} >
                    <Text style={{ 
                        fontSize:13, 
                        marginTop: 12,
                        color: Colors.grey}}> Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                            <Text style={{ 
                            fontSize:13, 
                            marginTop: 12,
                            paddingLeft: 4,  
                            color: 'black',
                            fontWeight: 'bold',
                            textDecorationLine: 'underline'}}>Log In</Text>
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
    backNav:{
        marginTop: 20,
        marginHorizontal: 15,
        marginBottom: 5,
    },
    inputContainer:{
        marginTop: 15,
        alignSelf: 'center',
        paddingLeft: 20,
        height: 50,
        width: 330,
        elevation: 25,
        borderRadius: 30,
        backgroundColor: Colors.white,
        borderWidth: 0,
    },
    signUpButton:{
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: Colors.primary,
        marginHorizontal: 20,
        borderRadius: 15, 
    },
})


export default SignUpScreen;