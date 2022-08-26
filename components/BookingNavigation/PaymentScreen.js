import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { Overlay } from "@rneui/base";
import { openDatabase } from 'react-native-sqlite-storage';

import { authentication } from '../../firebase/firebase-config';
import FormSuccess from "../shared/formSuccess";
import Colors from '../const/color';

const db = openDatabase({
    name: "hotel_booking", 
    location: 'default'
})

const PaymentScreen = ({navigation, route}) => {

    const hotel = route.params.hotel; 
    const dayCounter = route.params.dayCounter;
    const startDate = route.params.startDate;
    const adultCounter = route.params.adultCounter;
    const childCounter = route.params.childCounter;

    const [amount, setPrice] = useState(0);
    const [value, setValue] = React.useState('visa');
    const [isVisible, setIsVisible] = useState(false);
    const [OverlayText, setOverlayText] = useState("");
    const [popUpErr, setpopUpErr] = useState(false);

    useEffect(() => {
        setPrice(parseInt(hotel.price) * dayCounter);

        // Function to create bookings database table if does not exists
        const createTable = async () => {
            await db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY AUTOINCREMENT, userID VARCHAR(20), hotelName VARCHAR(20), hotelLocation VARCHAR(20), hotelImage VARCHAR(20), startDate VARCHAR(20), duration INTEGER, adults INTEGER, child INTEGER)',
                    [],
                    (sqlTxn, res) => {
                        console.log("Table created successfully");
                    },
                    error => {
                        console.log("Error creating table: " + error.message);
                    },
                );
            });
        };

        createTable();
    }, []);

    // Function to store the booking details and navigate user to booking page
    const bookNow = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO bookings (userID, hotelName, hotelLocation, hotelImage, startDate, duration, adults, child) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [authentication.currentUser.uid, hotel.name, hotel.location, hotel.image, startDate, dayCounter, adultCounter, childCounter],
                (sqlTxn, res) => {
                    console.log("Inserted data into table successfully");
                    setOverlayText("Booking successful!");
                    setpopUpErr(false);
                    setIsVisible(true);
                },
                error => {
                    console.log("Error inserting data into table: " + error.message);
                    setOverlayText(error.message);
                    setpopUpErr(true);
                    setIsVisible(true);
                },
            );
        });
    };
        
    return(      
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.backNav}>
                    <Ionicons
                        name="chevron-back-sharp"
                        size={40}
                        color='black'
                        onPress={navigation.goBack}
                    />
                </View>
                <Text style={{ 
                    fontSize:40, 
                    paddingLeft: 20, 
                    marginTop: 5, 
                    color: 'black', 
                    fontWeight: 'bold'}}>Payment
                </Text>
                <View>
                    <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#15456b',
                            marginLeft: 20,
                            marginTop: 20, 
                            marginBottom: 20,
                            float: 'left',
                        }}>Pay RM{amount}
                    </Text>
                </View>

                {/* Radio components for payment method */}
                <View style={styles.radioButton}>
                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                        <RadioButton.Item label="Visa Card" value="visa" />
                        <RadioButton.Item label="Master Card" value="master" />
                        <RadioButton.Item label="Touch and Go" value="tng" />
                        <RadioButton.Item label="Grab Pay" value="grab" />
                    </RadioButton.Group>
                </View>

                {/* Payment Button */}
                <View>
                    <TouchableOpacity onPress={bookNow}>
                        <View style={styles.bookButton}>
                            <Text style={{color: Colors.white, fontSize: 18, fontWeight: 'bold'}}>Pay Now</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Overlay for successful or unsuccessful booking */}
            <Overlay isVisible={isVisible} overlayStyle={{backgroundColor: "white", borderColor: "white", borderRadius: 20}} onBackdropPress={() => setIsVisible(false)}>
                <FormSuccess errorBtn={() => setIsVisible(false)} successBtn={() => setIsVisible(false)} text={OverlayText} error={popUpErr} />
            </Overlay>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.white, 
        flex: 1,
    },
    redioButton:{
        flexDirection: 'row', 
        flex: 1,
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
        marginTop: 40,
        backgroundColor: Colors.primary,
        marginHorizontal: 20,
        borderRadius: 15,
    },
})


export default PaymentScreen;