import React, {Component, useState} from "react";
import { SafeAreaView,Text, View, StyleSheet, Dimensions, TouchableOpacity, StatusBar, Image, useWindowDimensions, TextBase, TouchableNativeFeedback, Button, Platform} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../const/color'
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { color, ColorSpace } from "react-native-reanimated";
import {useNavigate} from 'react-router-dom';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CounterInput from "react-native-counters";

import { Modal } from "../components/modal";



const CancelBookingScreen = ({navigation, route}) =>{
    const item = route.params; 
    console.log(item);

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{ 
                    fontSize:25,  
                    alignSelf: 'center',
                    marginTop:10, 
                    marginBottom:5, 
                    color: 'black', 
                    fontWeight: 'bold'}}>Bookings
                </Text>
                <View>
                    <Text style={styles.line}> ───────────────────────────────────────── </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.mainBox}>


                        <View style={{flexDirection:'column'}}>

                            <View style={{flexDirection:'row', margin:15}}>
                                <Image 
                                    style={styles.popularImage}
                                    source={require('../../assets/img/hotel1.jpg')}
                                />

                                <View style={{flexDirection:'column', marginTop: 30, marginLeft: 20}}> 
                                    <Text style={{
                                        fontSize: 20, 
                                        fontWeight: 'bold', 
                                        color:'black',
                                        }}> Hotel Name </Text> 

                                    <Text style={{
                                        fontSize: 15,  
                                        color:'black',
                                        paddingLeft: 2,
                                        marginTop: 15,
                                        }}> Hotel Location </Text> 
                                </View>   


                            </View>

                            <Text style={styles.line}> ────────────────────────────────────── </Text>

                            <View style={styles.verticalBox}>
                                
                                <View style={{flexDirection:'column', marginLeft: 10, marginRight: 10, alignItems: 'center'}}>
                                    <Text style={{fontSize:15, }}> Start Date </Text>
                                    <Text style={{fontSize:20, fontWeight: 'bold', }}> 17/8/2022 </Text>
                                </View>

                                <View style={styles.verticleLine}></View>

                                <View style={{flexDirection:'column', marginLeft: 10, marginRight: 10, alignItems: 'center'}}>
                                    <Text style={{fontSize:15, }}> Stay Duration </Text>
                                    <Text style={{fontSize:20, fontWeight: 'bold', }}> 2 days </Text>
                                </View>

                                <View style={styles.verticleLine}></View>

                                <View style={{flexDirection:'column', marginLeft: 10, marginRight: 10, alignItems: 'center'}}>
                                    <Text style={{fontSize:15, }}> Adult </Text>
                                    <Text style={{fontSize:20, fontWeight: 'bold', }}> 2 </Text>
                                </View>

                                <View style={styles.verticleLine}></View>

                                <View style={{flexDirection:'column', marginLeft: 10, marginRight: 10, alignItems: 'center'}}>
                                    <Text style={{fontSize:15, }}> Children </Text>
                                    <Text style={{fontSize:20, fontWeight: 'bold', }}> 1 </Text>
                                </View>
                                
                            </View>

                            <Text style={styles.line}> ────────────────────────────────────── </Text>
                            <View style={{flexDirection:'row', paddingLeft:20, paddingTop: 5,}} >
                                <Icon name="cancel" size={25} color="#bf2b0a" />
                                <Text style={{fontSize: 18, paddingLeft: 20, color: "#bf2b0a" , paddingBottom: 5,}}> Cancelled </Text>
                            </View>

                            <Text style={styles.line}> ────────────────────────────────────── </Text>
                            <View style={{flexDirection:'row', paddingLeft:20, paddingTop: 5,}} >
                                <Ionicons name="chatbubble-ellipses-outline" size={25} color={Colors.primary} />
                                <Text style={{fontSize: 18, paddingLeft: 20, color: Colors.primary, paddingBottom: 10,}}> Email for more enquiries </Text>
                            </View>

                        </View>

                    </View>




                    {/* ----------------------------------------------------------------------------------------------- */}




                    <View>
                        <Text style={{textAlign: 'center', color: "#e0e0e0", marginTop: 5}}> ────────────────────────────────────── </Text>
                    </View>




                    {/* ----------------------------------------------------------------------------------------------- */}

                    
                    
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.white, 
        flex: 1,
    },

    line:{
        textAlign: 'center'

    },

    popularImage:{
        height: 140,
        width: 140,
        borderRadius: 20,
        flexDirection:'row', 
    },

    mainBox:{
        backgroundColor: Colors.light,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        height:355,
        borderRadius: 15,
    },
    verticalBox: {
        flexDirection: 'row',
        width: '100%',

    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
    },
})


export default CancelBookingScreen;