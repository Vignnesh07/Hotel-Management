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

const LogInScreen = ({navigation, onPress}) => {

    const [userInfo , setUserInfo]= useState({

        username: '',
        password: '',
    });

    const [error, setError] = useState('')

    const handleOnChangeText = (value,fieldName)=> {
        setUserInfo({...userInfo,[fieldName]:value})
    };

    const isValidForm = () =>{
        if(!isValidObjField(userInfo)) return updateError('Please Enter Your Username and Password!' , setError)

        if(username.length < 5 || username.length > 9 ) return updateError('Invalid Username' , setError)
        
    
    return true;

    };

    const submitForm = ()=>{
        if(isValidForm()){
            console.log(userInfo)
        }
    };
    const {username, password} = userInfo;

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

            {error ? ( 
            <Text style = {{color : 'red' ,fontSize : 13, textAlign: 'center'}}>
                {error}
            </Text>
            ):null }

            <View style={styles.inputContainer} >
                <TextInput  placeholder="Username" 
                value={username} 
                onChangeText={(value) => handleOnChangeText(value,'username')} 
                autoCapitalize = 'none'
                style={styles.input} />
            </View>
            <View style={styles.inputContainer} >
                <TextInput  
                    placeholder="Password" 
                    value={password} 
                    onChangeText={(value) => handleOnChangeText(value,'password')} 
                    autoCapitalize = 'none'
                    secureTextEntry={true}
                    style={styles.input} />
            </View>

            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                    <Text style={{color: Colors.grey, fontSize: 12, marginTop: 12, alignSelf:'flex-end', paddingRight: 60}}>Forgotten Password ?</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.loginButton}>
                <TouchableOpacity onPress={submitForm}>
                    <View style={styles.buttonContainer}>
                        <Text style={{color: Colors.white, fontSize: 20, fontWeight: 'bold'}}>Log In</Text>
                    </View>
                </TouchableOpacity>    
            </View>
            
            <View style={{flexDirection:'row', alignSelf: 'center'}} >
                    <Text style={{ 
                        fontSize:13, 
                        marginTop: 12,
                        color: Colors.grey}}> Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ 
                            fontSize:13, 
                            marginTop: 12,
                            paddingLeft: 4,  
                            color: 'black',
                            fontWeight: 'bold',
                            textDecorationLine: 'underline'}}>Sign Up</Text>
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
    input:{

    },
    loginButton:{
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        backgroundColor: Colors.primary,
        marginHorizontal: 20,
        borderRadius: 15, 
    },


   
    

})

export default LogInScreen;