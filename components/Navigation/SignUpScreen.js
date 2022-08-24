import React, {Component, useState} from "react";
import {Text, View, StyleSheet, Modal, Dimensions, TouchableOpacity, StatusBar, Image, useWindowDimensions, TextBase} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../const/color'
import { TextInput } from "react-native-gesture-handler";

const isValidObjField = (obj) =>{
    return Object.values(obj).every(value=> value.trim())
}

const updateError = (error,stateUpdater) =>{
    stateUpdater(error);
    setTimeout(() => {
        stateUpdater('')
    }, 2500);
}

const isValidEmail = (value) =>{
    const regx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regx.test(value)
}

const SignUpScreen = ({navigation,onPress}) => {
    const [userInfo, setUserInfo] = useState({
        username:'',
        phone_num: '',
        email:'',
        password:'',
        confirm_password: '',
    })

    const [error, setError] = useState('')

    const{username,phone_num,email,password,confirm_password} = userInfo

    const handleOnChangeText = (value,fieldName)=> {
        setUserInfo({...userInfo,[fieldName]:value})
    };

    const isValidForm = () =>{
        if(!isValidObjField(userInfo)) return updateError('Required to fill all fields!' , setError)

        if(username.length < 5 ) return updateError('Minimum 5 Characters required for Username!' , setError)

        if(username.length > 9 ) return updateError('Maximum 9 Characters required for Username!' , setError)

        if(phone_num.length < 10 || phone_num.length > 12) return updateError('Invalid Phone Number!' , setError)

        if(!isValidEmail(email)) return updateError('Invalid Email!' , setError)
        
        if(password.length < 7 ) return updateError('Minimum 8 Characters required for Password!' , setError)

        if(password !== confirm_password) return updateError('Password does not match!' , setError)
    
    return true;

    };
    const submitForm = ()=>{
        if(isValidForm()){
            console.log(userInfo)
        }
    };

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

            {error ? ( 
            <Text style = {{color : 'red' ,fontSize : 18, textAlign: 'center'}}>
                {error}
            </Text>
            ):null }
            <View style={styles.inputContainer} >
                <TextInput  placeholder="Username"  
                value={username}
                onChangeText = {(value) => handleOnChangeText(value,'username')}
                style={styles.input} />
            </View>

            <View style={styles.inputContainer} >
                <TextInput  placeholder="Phone Number"
                value={phone_num}  
                onChangeText = {(value) => handleOnChangeText(value,'phone_num')}
                keyboardType={'phone-pad'} 
                style={styles.input} />
            </View>

            <View style={styles.inputContainer} >
                <TextInput  placeholder="Email Address" 
                value={email}
                onChangeText = {(value) => handleOnChangeText(value,'email')}
                keyboardType={'email-address'} 
                autoCapitalize = 'none'
                style={styles.input} />
            </View>
            <View style={styles.inputContainer} >
                <TextInput  
                    placeholder="Password" 
                    value={password}
                    onChangeText = {(value) => handleOnChangeText(value,'password')}
                    autoCapitalize = 'none'
                    secureTextEntry={true}
                    style={styles.input} />
            </View>
            <View style={styles.inputContainer} >
                <TextInput  
                    placeholder="Confirm Password" 
                    value = {confirm_password}
                    onChangeText = {(value) => handleOnChangeText(value,'confirm_password')}
                    autoCapitalize = 'none'
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
                <TouchableOpacity onPress={submitForm}>
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