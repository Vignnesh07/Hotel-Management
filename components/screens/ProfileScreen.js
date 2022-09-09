import React, {Component} from "react";
import {Text, View, ScrollView, StyleSheet, Button} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../const/color'
import { color, ColorSpace } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";


const ProfileScreen =({navigation}) =>{

    return(
            
        <View style={styles.container} >
                <View>
                    <Text style={{ 
                        fontSize:40, 
                        paddingLeft: 20, 
                        marginTop: 20, 
                        color: 'black', 
                        fontWeight: 'bold'}}>Your Profile
                    </Text>
                    <Text style={{ 
                        fontSize:22, 
                        marginTop: 10,
                        paddingLeft: 22,  
                        color: Colors.grey}}>Log in to start booking your hotel.
                    </Text>
                </View>
                <View>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                            <View style={styles.loginButton}>
                                <Text style={{color: Colors.white, fontSize: 20, fontWeight: 'bold'}}>Log In</Text>
                            </View>
                        </TouchableOpacity>                       
                </View>
                <View style={{flexDirection:'row'}} >
                    <Text style={{ 
                        fontSize:17, 
                        marginTop: 20,
                        paddingLeft: 22,  
                        color: Colors.grey}}> Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ 
                            fontSize:17, 
                            marginTop: 20,
                            paddingLeft: 10,  
                            color: 'black',
                            fontWeight: 'bold',
                            textDecorationLine: 'underline'}}>Sign Up</Text>
                        </TouchableOpacity>

                </View>
                <View style={{marginTop: 30}}>
                    <Text style={styles.line}> ──────────────────────────────────── </Text>
                </View>
                <View style={{flexDirection:'row', paddingLeft:26, paddingTop: 10}} >

                    <Ionicons name="settings-outline" size={30} />
                    <Text style={{fontSize: 22, paddingLeft: 40, color: 'black'}}> Settings </Text>
                    <Ionicons name="chevron-forward-sharp" size={30} style={{paddingLeft: 172}} />

                </View>
                <View style={{marginTop: 10}}>
                    <Text style={styles.line}> ──────────────────────────────────── </Text>
                </View>
                <View style={{flexDirection:'row', paddingLeft:29, paddingTop: 10}} >

                    <Ionicons name="ios-book-outline" size={30} />
                    <Text style={{fontSize: 22, paddingLeft: 38, color: 'black'}}> Privacy Policy </Text>
                    <Ionicons name="chevron-forward-sharp" size={30} style={{paddingLeft: 118}} />

                </View>
                <View style={{marginTop: 10}}>
                    <Text style={styles.line}> ──────────────────────────────────── </Text>
                </View>
                <View style={{flexDirection:'row', paddingLeft:26, paddingTop: 10}} >

                    <Ionicons name="help-circle-outline" size={38} />
                    <Text style={{fontSize: 22, paddingLeft: 33, color: 'black'}}> Get Help </Text>
                    <Ionicons name="chevron-forward-sharp" size={30} style={{paddingLeft: 169}} />

                </View>

                
        </View>

    

    );
};

       
    


const styles = StyleSheet.create({

    container:{
        backgroundColor: Colors.white, 
        flex: 1,
    },
    loginButton:{
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: Colors.primary,
        marginHorizontal: 20,
        borderRadius: 15, 
    },
    line:{
        textAlign: 'center'

    }

})

export default ProfileScreen;
