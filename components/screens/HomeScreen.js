import React, {Component, useState, useRef, componentDidMount} from 'react';
import {StyleSheet, Animated, SafeAreaView, Text, Image, View, TouchableOpacity, Dimensions, Button} from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, getDocs } from 'firebase/firestore/lite';

import Colors from '../const/color'
import Hotels from '../const/hotel'
import { firebaseDB } from '../../firebase/firebase-config';

const {width} = Dimensions.get('screen');
const holderWidth = width / 1.8;

const HomeScreen = ({navigation}) => {
    const categories = ['All', 'Popular', 'Best Selling', 'Featured', 'Luxury'];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [dataList, setDataList] = useState(Hotels);
    const [activeCard, setActiveCard] = React.useState(0);
    const scrollHolder = useRef(new Animated.Value(0)).current;

    // Function to retrieve data from Firestore
    const query = async () => {
        const hotelsCollection = collection(firebaseDB, 'hotels');
        const hotelSnapshot = await getDocs(hotelsCollection);
        const hotelList = hotelSnapshot.docs.map(doc => doc.data());
    }

    query();

    // Function to update screen based on selected categories
    const setCategory = selectedCategory => {
        console.log(selectedCategory);
        if (selectedCategory !== 0)
            setDataList([...Hotels.filter(e => e.category === categories[selectedCategory])])
        else 
            setDataList(Hotels)
            
        setSelectedCategory(selectedCategory)
    }

    // Search function that displays hotels based on hotel name
    const search = (input) => {
        let searchedData = Hotels.filter(e => e.name.toLowerCase().includes(input.toLowerCase()))
        setDataList(searchedData)

        if (input === '')
            setDataList(Hotels)
    }

    // Function that displays the row of categories
    const CategoryList = () => {
        return(
            <View style={styles.categoryListContainer}>
                {categories.map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        activeOpacity={0.8}
                        onPress={() => setCategory(index)}>
                        <View>
                            <Text 
                                style={{
                                    ...styles.categoryListText,
                                    color:
                                        selectedCategory == index
                                            ?Colors.primary
                                            :Colors.grey,
                                }}>
                                {item}
                            </Text>
                            {selectedCategory == index && (
                                <View
                                    style={{
                                        height: 3,
                                        width: 20,
                                        marginTop: 2,
                                        backgroundColor: Colors.primary,
                                    }}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    // Function to display the top row of hotels 
    const Holder =({hotel, index}) => {

        const inputRange = [
            (index - 1) * holderWidth,
            index * holderWidth,
            (index + 1) * holderWidth,
          ];
        const opacity = scrollHolder.interpolate({
            inputRange,
            outputRange: [0.7, 0, 0.7],
        });
        const scale = scrollHolder.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
        });

        return (
            <TouchableOpacity
                activeOpacity={1}
                disabled={activeCard != index}
                onPress={() => navigation.navigate('HotelDetail', hotel)}>
                <Animated.View style={{...styles.holderStyle, transform:[{scale}]}}>
                    <Animated.View style={{...styles.holderOverlay, opacity}} />
                    <View style={styles.priceHolder}>
                        <Text style={{color: Colors.priceTagFont, fontSize:15, fontWeight:'bold'}}>RM{hotel.price}</Text>
                    </View>
                    <Image source={hotel.image} style={styles.holderImage}/>
                    <View style={styles.holderDetails}>

                        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                            <View>
                                <Text style={{fontWeight:'bold', fontSize:15}}>{hotel.name}</Text>
                                <Text style={{color: Colors.grey, fontSize:12}}>{hotel.location}</Text>
                            </View>
                            <Ionicons name='bookmark-outline' size={25} color={Colors.primary}  />
                        </View>

                        <View 
                            style={{
                                flexDirection: 'row', 
                                justifyContent: 'space-between',
                                marginTop: 10,
                                }}>
                            <View style={{flexDirection: 'row'}}>
                                <Ionicons name='star' size={15} color={Colors.orange}/>
                                <Ionicons name='star' size={15} color={Colors.orange}/>
                                <Ionicons name='star' size={15} color={Colors.orange}/>
                                <Ionicons name='star' size={15} color={Colors.orange}/>
                                <Ionicons name='star' size={15} color={Colors.grey}/>
                            </View>
                            <Text style={{fontSize: 11}}> 628 reviews</Text>
                        </View>

                    </View>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    // Container to display the nearby hotels 
    const NearYouHotels = ({hotel}) =>{
        return(
            <View style={styles.popularHotelStyle}>
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
                
                <Image style={styles.popularImage} source={hotel.image} />
                <View style={{paddingVertical: 5, paddingHorizontal:10}}>
                    <Text style={{fontSize: 11, fontWeight: 'bold'}}>{hotel.name}</Text>
                    <Text style={{fontSize: 8, color: Colors.grey}}>{hotel.location}</Text>
                </View>
            </View>
        );
    };


    return(
        <SafeAreaView style={styles.container}>

            {/* Header with app logo and title */}
            <View>
                <View>
                    <Image style={styles.image} source={require('../../assets/img/Logo.png')} /> 
                </View>
                <View style={{flexDirection: 'row', paddingTop: 10, paddingLeft: 10}}>
                    <Text style={{fontSize:25, fontWeight:'bold', color: Colors.lightblack}}> Hotels in </Text>
                    <Text style={{fontSize:25, fontWeight:'bold', color: Colors.primary}}>Malaysia </Text>
                </View>
            </View>

            {/* Search bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={25} style={{marginLeft: 20, color: Colors.lightblack}} />
                <TextInput
                    onChangeText={(input) => {
                        search(input)
                    }}
                    placeholder="Where to?" 
                    style={{fontSize:15, paddingLeft:10}}
                /> 
            </View>

            {/* List of categories to sort hotels */}
            <CategoryList/>

            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* Horizontal scrollale list of hotels based on categories */}
                <View>
                    <Animated.FlatList
                        onMomentumScrollEnd={(e) => {
                            setActiveCard(
                                Math.round(e.nativeEvent.contentOffset.x / holderWidth),
                            );
                        }}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x: scrollHolder}}}],
                            {useNativeDriver: true},
                        )}
                        horizontal
                        data={dataList}
                        contentContainerStyle={{paddingVertical: 30, paddingLeft: 20, paddingRight: holderWidth / 2 - 50,}}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => <Holder hotel={item} index={index} />}
                        snapToInterval={holderWidth}
                    />
                </View>

                {/* Section divider with title */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                }}>
                    <Text style={{fontWeight: 'bold', color: "black"}}> Near You </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AllHotels', Hotels)}>
                        <Text style={{ color: "black"}}> Show All </Text> 
                    </TouchableOpacity>
                </View>
                
                {/* Horizontal scrollable list of nearby hotels */}
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={Hotels}
                    contentContainerStyle={{
                        marginTop: 20,
                        paddingLeft: 20,
                        paddingBottom: 30,
                    }}
                    renderItem ={({item}) => <NearYouHotels hotel={item} />}
                />
            </ScrollView>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.white,
    },
    image: {
        marginTop:20,
        width: 70,
        height: 70,
        marginLeft: 20,
    }, 
    searchContainer:{
        height: 50,
        backgroundColor: Colors.light,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 0,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection:'row',
        alignItems: 'center',
    },
    categoryListContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
    },
    categoryListText:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    holderStyle:{
        height: 250,
        width: holderWidth,
        elevation: 15,
        marginRight: 20,
        borderRadius: 15,
        backgroundColor: Colors.white,
    },
    holderImage:{
        height: 200,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    priceHolder:{
        height: 50,
        width: 70,
        backgroundColor: Colors.priceTagColour,
        position: 'absolute',
        zIndex: 1,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    holderDetails:{
        height: 90,
        borderRadius: 15,
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: 0,
        padding: 15,
        width: '100%',
    },
    holderOverlay:{
        height: 250,
        backgroundColor: Colors.white,
        position: 'absolute',
        zIndex: 100,
        width: holderWidth,
        borderRadius: 15,
    },
    popularHotelStyle:{
        height: 120,
        width: 120,
        backgroundColor: Colors.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    popularImage:{
        height: 80,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

});



export default HomeScreen;


