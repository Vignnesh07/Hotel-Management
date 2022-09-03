import React, { Component, useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, ImageBackground, StatusBar, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { onAuthStateChanged } from "firebase/auth";
import { Overlay } from "@rneui/base";
import { openDatabase } from 'react-native-sqlite-storage';

import FormSuccess from "../shared/formSuccess";
import { authentication,  } from '../../firebase/firebase-config';
import Colors from '../const/color';

const db = openDatabase({
    name: "hotel_booking", 
    location: 'default'
});

const HotelDetailScreen = ({navigation, route}) => {

    const hotel = route.params.hotel;
    const [favourites, setFavourites] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [OverlayText, setOverlayText] = useState("");
    const [popUpErr, setpopUpErr] = useState(false);

    useEffect(() => { 

        // Listens to auth changes to enable favourites function
        onAuthStateChanged(authentication, (user) => {
            if (user != null) 
                setIsLoggedIn(true);
            else
                setIsLoggedIn(false);
        });

        
        getFavouriteHotels();
    }, []);

    // Function snippet to check if hotel exists in favourites
    const checkHotel = element => element.hotelID === hotel.id;

    // Function to retrieve favourites hotel
    const getFavouriteHotels = async () => {
        if (isLoggedIn) {
            await db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM favourites WHERE userID=? AND hotelID=?',
                    [authentication.currentUser.uid, hotel.id],
                    (sqlTxn, res) => {
                        console.log("Retrieved data successfully");
    
                        let len = res.rows.length;
    
                        if (len > 0) {
                            console.log("Got data");
                            let results = [];
                            for (let i = 0; i < len; i++) {
                                let item = res.rows.item(i);
                                results.push({ id: item.id, userID: item.userID, hotelID: item.hotelID });
                            }
                            setFavourites(prev => ([...prev, ...results]));
                            console.log(favourites);
                        }

                        else {
                            console.log("No data");
                            setFavourites([]);
                            console.log(favourites);
                        }
                    },
                    error => {
                        console.log("Error retrieving data from table: " + error.message);
                    },
                );
            });
        }
    };

    // Function to add hotels to user favourites
    const addToFavourites = () => {
        console.log(authentication.currentUser.uid);
        if (isLoggedIn) {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO favourites (userID, hotelID) VALUES (?, ?)',
                    [authentication.currentUser.uid, hotel.id],
                    (sqlTxn, res) => {
                        console.log("Inserted data into table successfully");
                        getFavouriteHotels();
                    },
                    error => {
                        console.log("Error inserting data into table: " + error.message);
                        setOverlayText(error.message);
                        setpopUpErr(true);
                        setIsVisible(true);
                    },
                );
            });
            setOverlayText("Added to favourites!");
            setpopUpErr(false);
            setIsVisible(true);
        }
        else {
            setOverlayText("Please sign-in to add hotels to favourites");
            setpopUpErr(true);
        }
    };

    // Function to remove hotels from user favourites
    const removeFromFavourites = async () => {
        console.log(authentication.currentUser.uid);
        await db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM favourites WHERE hotelID=?',
                [hotel.id],
                (sqlTxn, res) => {
                    console.log("Removed from table successfully");
                    getFavouriteHotels();
                },
                error => {
                    console.log("Error removing data from table: " + error.message);
                    setOverlayText(error.message);
                    setpopUpErr(true);
                    setIsVisible(true);
                },
            );
        });
        setOverlayText("Added to favourites!");
        setpopUpErr(false);
        setIsVisible(true);
        console.log(favourites);
    };

    // Function to handle booking logic - if signed-in, then proceed
    const canBook = () => {
        if (isLoggedIn) {
            navigation.navigate('BookNow', {hotel: hotel, isUpdate: false});
        }
        else {
            setOverlayText("Please sign-in to place a booking");
            setpopUpErr(true);
            setIsVisible(true);
        }
    };

    return(
        <SafeAreaView>
            <View>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={Colors.white}
                 />
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    backgroundColor: Colors.white,
                    paddingBottom: 20,
                }}>
            

                <ImageBackground  style={styles.desImage} source={{uri: hotel.image}} >    
                    <View style={styles.backBookNav}>
                    <Ionicons
                        name="chevron-back-sharp"
                        size={40}
                        color={Colors.backBook}
                        onPress={navigation.goBack}
                    />
                    {
                        favourites.some(checkHotel) ? 
                        (
                            <Ionicons name="bookmark" size={32} color={Colors.primary} onPress={removeFromFavourites}/>
                        )
                        :
                        (
                            <Ionicons name="bookmark-outline" size={32} color={Colors.backBook} onPress={addToFavourites}/>
                        )
                    }
                    </View>
                </ImageBackground>

                <View>
                    <View style={styles.iconContainer}>
                        <Icon name="place" color={Colors.white} size={35} />
                    </View>
                    <View style={{marginTop: 20, paddingHorizontal: 20}}>
                        <Text style={{fontSize: 23, fontWeight: 'bold', color: 'black'}}>{hotel.name}</Text>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: '400',
                                color: Colors.grey,
                                marginTop: 5,
                            }}>
                            {hotel.location}
                        </Text>

                        <View
                            style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Ionicons name="star" size={20} color={Colors.orange} />
                                    <Ionicons name="star" size={20} color={Colors.orange} />
                                    <Ionicons name="star" size={20} color={Colors.orange} />
                                    <Ionicons name="star" size={20} color={Colors.orange} />
                                    <Ionicons name="star" size={20} color={Colors.grey} />
                                </View>
                                <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 5}}> 4.0 </Text>
                            </View>
                            <Text style={{fontSize: 13, color: Colors.grey}}>2729 reviews</Text>
                        </View>
                        <View>
                            <Text style={{lineHeight: 20, color: Colors.grey, textAlign: 'justify'}}>{hotel.details}</Text>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 20,
                        alignItems: 'center',
                    }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Price Per Night</Text>
                        <View style={styles.priceTag}>
                        <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#15456b',
                            marginLeft: 5,
                        }}>RM{hotel.price}
                        </Text>
                        <Text
                        style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: '#15456b',
                            marginLeft: 5,
                        }}>+breakfast
                        </Text>

                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress = {canBook}>
                            <View style={styles.bookButton}>
                                <Text style={{color: Colors.white, fontSize: 18, fontWeight: 'bold'}}>Book Now</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Overlay isVisible={isVisible} overlayStyle={{backgroundColor: "white", borderColor: "white", borderRadius: 20}} onBackdropPress={() => setIsVisible(false)}>
                    <FormSuccess successBtn={() => setIsVisible(false)} errorBtn={() => setIsVisible(false)} text={OverlayText} error={popUpErr} />
                </Overlay>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    desImage:{
        height: 320,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        overflow: 'hidden',
    },
    backBookNav:{
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    iconContainer: {
        position: 'absolute',
        height: 60,
        width: 60,
        backgroundColor: Colors.primary,
        top: -30,
        right: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      priceTag: {
        height: 40,
        alignItems: 'center',
        marginLeft: 40,
        paddingLeft: 20,
        flex: 1,
        backgroundColor: Colors.secondary,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row',
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

export default HotelDetailScreen;