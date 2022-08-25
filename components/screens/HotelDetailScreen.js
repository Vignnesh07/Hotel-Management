import React, {Component} from 'react';
import {ScrollView, Text, StyleSheet, ImageBackground, StatusBar, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../const/color'

const HotelDetailScreen = ({navigation, route}) => {
    const item = route.params;
    console.log(item);
    return(
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                backgroundColor: Colors.white,
                paddingBottom: 20,
            }}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="rgba(0, 0, 0, 0)"
            />
            <ImageBackground 
                style={styles.desImage}
                source={{uri: item.image}}
            >    
                <View style={styles.backBookNav}>
                <Ionicons
                    name="chevron-back-sharp"
                    size={35}
                    color={Colors.backBook}
                    onPress={navigation.goBack}
                />
                <Ionicons name="bookmark-outline" size={28} color={Colors.backBook} />
                </View>
            </ImageBackground>
            <View>
                <View style={styles.iconContainer}>
                    <Icon name="place" color={Colors.white} size={35} />
                </View>
                <View style={{marginTop: 20, paddingHorizontal: 20}}>
                    <Text style={{fontSize: 23, fontWeight: 'bold', color: 'black'}}>{item.name}</Text>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: '400',
                            color: Colors.grey,
                            marginTop: 5,
                        }}>
                        {item.location}
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
                        <Text style={{lineHeight: 20, color: Colors.grey, textAlign: 'justify'}}>{item.details}</Text>
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
                    }}>RM{item.price}
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
                <View style={styles.bookButton}>
                    <Text style={{color: Colors.white, fontSize: 18, fontWeight: 'bold'}}>Book Now</Text>
                </View>
            </View>
        </ScrollView>
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
        marginTop: 35,
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