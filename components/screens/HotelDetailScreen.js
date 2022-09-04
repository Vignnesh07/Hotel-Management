import React, { Component, useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, ImageBackground, StatusBar, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { onAuthStateChanged } from "firebase/auth";
import { Overlay } from "@rneui/base";
import { openDatabase } from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';

import { setWishlist } from "../app/wishlist";
import FormSuccess from "../shared/formSuccess";
import { authentication,  } from '../../firebase/firebase-config';
import Colors from '../const/color';

const db = openDatabase({
    name: "hotel_booking", 
    location: 'default'
});

const HotelDetailScreen = ({navigation, route}) => {

    // Parameter hotel      => obtains the specific hotel information (which was selected by user)
    const hotel = route.params.hotel;

    // To update application state upon successful CRUD operations
    const dispatch = useDispatch();

    // 'wishlist' array from redux store 
    const { wishlist } = useSelector((state) => state.wishlist);
    // const [wishlists, setFavourites] = useState([]);

    // Boolean value to enable user bookings/save hotel only if logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);

    // To display overlay text box (for successful/failed operations)
    const [isVisible, setIsVisible] = useState(false);
    const [OverlayText, setOverlayText] = useState("");
    const [popUpErr, setpopUpErr] = useState(false);

    useEffect(() => { 
        // Listens to auth changes to allow user to add hotels to wishlist
        onAuthStateChanged(authentication, (user) => {
            if (user != null) 
                setIsLoggedIn(true);
            else
                setIsLoggedIn(false);
        });
        
        getWishlist();
    }, []);

    // Function snippet to check if hotel exists in favourites
    const checkHotel = element => element.hotelID === hotel.id;

    // Function to retrieve wishlist
    const getWishlist = () => {
        try {
            if (isLoggedIn) {
                db.transaction(tx => {
                    tx.executeSql(
                        "SELECT * FROM favourites",
                        [],
                        (sqlTxn, res) => {
                            let len = res.rows.length;

                            console.log("Retrieved data successfully. Length: " + len);
        
                            if (len > 0) {
                                let results = [];
                                for (let i = 0; i < len; i++) {
                                    let item = res.rows.item(i);
                                    results.push({ id: item.id, userID: item.userID, hotelID: item.hotelID });
                                }
                                dispatch(setWishlist(results));
                            }

                            else{
                                dispatch(setWishlist([]));
                            }
                        },
                        error => {
                            console.log("Error retrieving data from table: " + error.message);
                        },
                    );
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to add hotels to user favourites
    const addToFavourites = () => {
        if (isLoggedIn) {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO favourites (userID, hotelID) VALUES (?, ?)',
                    [authentication.currentUser.uid, hotel.id],
                    (sqlTxn, res) => {
                        console.log("Inserted data into table successfully");
                        getWishlist();
                        setOverlayText("Added to favourites!");
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
        }
        else {
            setOverlayText("Please sign-in to add hotels to favourites");
            setpopUpErr(true);
        }
    };

    // Function to remove hotels from user favourites
    const removeFromFavourites = () => {
        console.log(authentication.currentUser.uid);
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM favourites WHERE hotelID=?',
                [hotel.id],
                (sqlTxn, res) => {
                    console.log("Removed from table successfully");
                    getWishlist();
                    setOverlayText("Removed from favourites!");
                    setpopUpErr(false);
                    setIsVisible(true);
                    console.log(wishlist);
                },
                error => {
                    console.log("Error removing data from table: " + error.message);
                    setOverlayText(error.message);
                    setpopUpErr(true);
                    setIsVisible(true);
                },
            );
        });
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
                        wishlist.some(checkHotel) ? 
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