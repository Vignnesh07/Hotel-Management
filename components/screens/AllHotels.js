import React, {Component, useState, useRef} from 'react';
import { StyleSheet, Appbar, SafeAreaView, Text, Image, View, TouchableOpacity, Dimensions, Button, StatusBar } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../const/color'

const rows = 3;
const cols = 2;
const marginHorizontal = 5;
const marginVertical = 7;
const width = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const height = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));

const AllHotels = ({navigation, route}) => {

    const hotels = route.params;
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header with app logo and title */}
                <View>
                    <View>
                        <Image style={styles.headerLogoStyle} source={require('../../assets/img/Logo.png')} /> 
                    </View>
                    <View style={{flexDirection: 'row', paddingTop: 10, paddingLeft: 10}}>
                        <Text style={{fontSize:25, fontWeight:'bold', color: Colors.lightblack}}> Hotels in </Text>
                        <Text style={{fontSize:25, fontWeight:'bold', color: Colors.primary}}>Malaysia </Text>
                    </View>
                </View>

            
                <View style={styles.sectionStyles}>
                    {/* Vertical scrollale list of hotels based on categories */}
                    {hotels.map((item, index) => (
                        <TouchableOpacity key={index} activeOpacity={1} onPress={() => navigation.navigate('HotelDetail', item)}>
                            <View key={index} style={styles.hotelListStyle}>
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        zIndex: 1,
                                        flexDirection: 'row',
                                    }}>
                                    <Ionicons name="star" size={15} color={Colors.orange} />
                                    <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 15}}>4.6</Text>
                                </View>
                                <Image style={styles.hotelImageStyle} source={{uri: item.image}} />
                                <View style={{paddingVertical: 5, paddingHorizontal:10,}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold',}}>{item.name}</Text>
                                    <Text style={{fontSize: 11, color: Colors.grey,}}>{item.location}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    headerLogoStyle: {
        marginTop: 10,
        width: 70,
        height: 70,
        marginLeft: 20,
    },
    sectionStyles: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center', 
        paddingVertical: 20,
    },
    hotelListStyle: {
        marginTop: marginVertical,
        marginBottom: marginVertical,
        marginLeft: marginHorizontal,
        marginRight: marginHorizontal,
        width: width,
        height: height,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 15,
        borderRadius: 10,
    },
    hotelImageStyle: {
        alignSelf: 'flex-start',
        height: height / 1.5,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});

export default AllHotels;