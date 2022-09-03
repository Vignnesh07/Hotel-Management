import React, { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button, } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { Overlay } from "@rneui/base";
import { openDatabase } from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';

import { setBookings } from "../app/bookings";
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

    const [amount, setAmount] = useState(0);
    const [value, setValue] = React.useState('visa');
    const [isVisible, setIsVisible] = useState(false);
    const [OverlayText, setOverlayText] = useState("");
    const [popUpErr, setpopUpErr] = useState(false);

    const { bookings } = useSelector(state => state.bookings);
    const dispatch = useDispatch();

    useEffect(() => {
        setAmount(parseInt(hotel.price) * dayCounter);
    }, []);

    // Function to store the booking details and navigate user to booking page
    const bookNow = () => {
        try {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO bookings (userID, hotelName, hotelLocation, hotelImage, startDate, duration, adults, child, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [authentication.currentUser.uid, hotel.name, hotel.location, hotel.image, startDate, dayCounter, adultCounter, childCounter, amount],
                    (sqlTxn, res) => {
                        console.log("Inserted booking data into table successfully");
                    },
                    error => {
                        console.log("Error inserting data into table: " + error.message);
                        setOverlayText(error.message);
                        setpopUpErr(true);
                        setIsVisible(true);
                    }, 
                );
            });
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM bookings',
                    [],
                    (sqlTxn, res) => {
                        let len = res.rows.length;
                        if (len > 0) {
                            console.log("Got data");
                            let results = [];
                            for (let i = 0; i < len; i++) {
                                let item = res.rows.item(i);
                                results.push({ id: item.id, userID: item.userID, hotelName: item.hotelName, hotelLocation: item.hotelLocation, hotelImage: item.hotelImage, startDate: item.startDate, duration: item.duration, adults: item.adults, child: item.child, price: item.price });
                            }
                            dispatch(setBookings(results));
                            setOverlayText("Booking successful!");
                            setpopUpErr(false);
                            setIsVisible(true);
                        }
                    },
                    error => {
                        console.log("Error creating table: " + error.message);
                    },
                );
            });
        } catch (error) {
            console.log(error);
        }
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
                <FormSuccess errorBtn={() => setIsVisible(false)} successBtn={() => navigation.navigate('Upcoming')} text={OverlayText} error={popUpErr} />
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