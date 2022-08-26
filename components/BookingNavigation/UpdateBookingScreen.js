import React, { Component, useState } from "react";
import { ImageBackground, SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableOpacity, StatusBar, Image, useWindowDimensions, TextBase, TouchableNativeFeedback, Button, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { useNavigate } from 'react-router-dom';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CounterInput from "react-native-counters";

import Colors from '../const/color'
import { Modal } from "./modal";

const UpdateBookingScreen = ({navigation, route}) => {

    const hotel = 'route.params.hotel'; 
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [startText, setStartText] = useState('Start Date');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dayCounter, setDayText] = useState(0);
    const [adultCounter, setAdultText] = useState(0);
    const [childCounter, setChildText] = useState(0);

    // Function to open native date picker
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    // Function to close native date picker
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    // Function to handle the number of guests
    const handleModal = () => setIsModalVisible(() => !isModalVisible);  

    // Function to confirm and set date values
    const handleConfirmStart = (selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
        let tempDate = new Date(currentDate);
        let startDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setStartText(startDate);     
        hideDatePicker();
    };

    return(
        <SafeAreaView>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View style={styles.backNav}>
                        <Ionicons
                            name="chevron-back-sharp"
                            size={40}
                            color='black'
                            onPress={navigation.goBack}
                        />
                    </View>
                    
                    <Text style={{ 
                        fontSize:25, 
                        alignSelf:'center',
                        color: 'black', 
                        fontWeight: 'bold'}}>Confirm Booking Details
                    </Text>
                    <View style={{marginTop: 10}}>
                        <Text style={styles.line}> ─────────────────────────────────────── </Text>
                    </View>

                    <ImageBackground style={styles.desImage} source={{uri: hotel.image}} />    

                    <View style={styles.mainBox}>
                        <View style={{flexDirection:'row'}}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#15456b',
                                    marginTop: 20,
                                    marginLeft: 20,
                                    float: 'left',
                                }}>RM {hotel.price}
                            </Text>

                            <Text style={{
                                    fontSize: 16,
                                    color: '#15456b',
                                    marginLeft: 5,
                                    marginTop: 24,
                                    float:'right',
                                }}> / Night
                            </Text>
                        </View>

                        <View>
                            <Text style={{
                                    fontSize: 16,
                                    color: '#15456b',
                                    marginTop: 10,
                                    marginLeft: 18,
                                }}> Book for 2 guests, for a special rewards!
                            </Text>
                        </View>
                        
                        <View style={{flexDirection:'row', margin:20, flex:2}}>

                            {/* Select date components */}
                            <View style={styles.child}>
                                <TouchableOpacity onPress={showDatePicker}>
                                    <View style={styles.child}> 
                                        <Text style={{color: Colors.lightblack, fontSize: 19, fontWeight: 'bold'}}>Select Date</Text>
                                    </View>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirmStart}
                                    onCancel={hideDatePicker}
                                />
                            </View>

                            {/* Select guests components */}
                            <View style={styles.child}>
                                <TouchableOpacity onPress={handleModal}>
                                    <View style={styles.child}> 
                                        <Text style={{color: Colors.lightblack, fontSize: 18, fontWeight: 'bold'}}>Select Guests</Text>
                                    </View>
                                </TouchableOpacity>
                                <Modal isVisible={isModalVisible}>
                                    <Modal.Container>
                                    <Modal.Header title="Choose Number Of Guest" />
                                    <Modal.Body>
                                        <Text style={styles.text}>Adult</Text>
                                        <CounterInput
                                            onChange={(counter) => {
                                                setAdultText(counter);
                                            }}
                                        />
                                        <Text style={styles.text}>Children</Text>
                                        <CounterInput
                                            onChange={(counter) => {
                                                setChildText(counter);
                                            }}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button title="Save" onPress={handleModal} />
                                    </Modal.Footer>
                                    </Modal.Container>
                                </Modal>
                            </View>
                        </View>

                        {/* Select stay duration components */}
                        <View style={styles.duration}>
                            <View> 
                                <Text style={{color: Colors.lightblack, fontSize: 19, fontWeight: 'bold'}}>Select Stay Duration</Text>
                            </View>

                            <Text>       </Text>
                            
                            <View>
                                <CounterInput
                                    onChange={(counter) => {
                                        setDayText(counter);
                                    }}
                                />
                            </View>
                        </View>

                        {/* Overall input details */}
                        <View style={{flexDirection:'row'}}>
                            <Text style={{
                                marginBottom:5, 
                                color: Colors.lightblack,
                                fontSize: 18, 
                                fontWeight: 'bold',
                                paddingRight: 20,
                                marginLeft: 20,}}>Start Date</Text>

                            <Text style={{
                                marginBottom:17, 
                                fontSize: 18, 
                                fontWeight: 'bold',
                                marginLeft: 20,}}>{startText}</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text style={{
                                marginBottom:5, 
                                color: Colors.lightblack,
                                fontSize: 18,
                                paddingRight: 34, 
                                fontWeight: 'bold',
                                marginLeft: 20,}}>Duration</Text>

                            <Text style={{
                                marginBottom:18, 
                                fontSize: 18, 
                                fontWeight: 'bold',
                                marginLeft: 20,}}>{dayCounter} days</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text style={{
                                marginBottom:5, 
                                color: Colors.lightblack,
                                fontSize: 18, 
                                paddingRight: 61,
                                fontWeight: 'bold',
                                marginLeft: 20,}}>Adult</Text>

                                <Text style={{
                                marginBottom:20, 
                                fontSize: 18, 
                                fontWeight: 'bold',
                                marginLeft: 20,}}>{adultCounter}</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text style={{
                                marginBottom:5, 
                                color: Colors.lightblack,
                                fontSize: 18, 
                                paddingRight: 35,
                                fontWeight: 'bold',
                                marginLeft: 20,}}>Children</Text>

                                <Text style={{
                                marginBottom:20, 
                                fontSize: 18, 
                                fontWeight: 'bold',
                                marginLeft: 20,}}>{childCounter}</Text>
                        </View>
                    </View>

                    {/* Proceeds to payment page */}
                    <View>
                        <TouchableOpacity onPress = {() => navigation.navigate('Payment', { 
                            hotel: hotel, dayCounter: dayCounter, startDate: startText, adultCounter: adultCounter, childCounter: childCounter
                        })}>
                            <View style={styles.bookButton}>
                                <Text style={{color: Colors.white, fontSize: 18, fontWeight: 'bold'}}>Book Now</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
    desImage:{
        marginTop: 20,
        height: 320,
        borderRadius: 50,
        overflow: 'hidden',
    },
    mainBox:{
        backgroundColor: Colors.light,
        flex: 2,
        margin: 20,
        borderRadius: 15,
    },
    duration:{
        height: 50,
        alignItems: 'center',
        border: '1px',
        borderRadius: 15,
        backgroundColor: Colors.white,
        borderColor: Colors.lightblack,
        margin:20, 
        marginBottom: 30,
        justifyContent:'center', 
        flexDirection:'row',
    },
    child:{
        width: '50%',
        height: 50,
        alignItems: 'center',
        border: '1px',
        borderRadius: 15,
        backgroundColor: Colors.white,
        borderColor: Colors.lightblack,
    },
    backNav:{
        marginTop: 20,
        marginHorizontal: 15,
        marginBottom: 5,
    },
    bookButton: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        backgroundColor: Colors.primary,
        marginHorizontal: 20,
        borderRadius: 15,
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "left",
    },
    line:{
        textAlign: 'center'

    }
})


export default UpdateBookingScreen;