{/* MAIN SCREEN */}


import React, {Component} from 'react';
import {StyleSheet, Animated, SafeAreaView, Text, Image, View, TouchableOpacity, Dimensions} from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';


import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../const/color'
import Hotels from '../const/hotel'

const {width} = Dimensions.get('screen');
const holderWidth = width / 1.8;

const HomeScreen = ({navigation}) => {
    const categories = ['All', 'Popular', 'Best Selling', 'Featured', 'Luxury'];
    const [selectedCategory, setSelectedCategory] = React.useState(0);
    const [activeCard, setActiveCard] = React.useState(0);
    const scrollHolder = React.useRef(new Animated.Value(0)).current;

    const CategoryList = () => {
        return(
            <View style={styles.categoryListContainer}>
                {categories.map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        activeOpacity={0.8}
                        onPress={() => setSelectedCategory(index)}>
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

   const PopularHotel = ({hotel}) =>{
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
            <View>

                <View>
                    <Image style={styles.image} source={require('../../assets/img/Logo.png')} /> 
                </View>
                <View style={{flexDirection: 'row', paddingTop: 10, paddingLeft: 10}}>
                    <Text style={{fontSize:25, fontWeight:'bold', color: Colors.lightblack}}> Hotels in </Text>
                    <Text style={{fontSize:25, fontWeight:'bold', color: Colors.primary}}>Malaysia </Text>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={25} style={{marginLeft: 20, color: Colors.lightblack}} />
                 <TextInput 
                      placeholder="Where to?" 
                     style={{fontSize:15, paddingLeft:10}}
                 /> 
            </View>
            <CategoryList/>

            <ScrollView showsVerticalScrollIndicator={false}>
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
                        data={Hotels}
                        contentContainerStyle={{paddingVertical: 30, paddingLeft: 20, paddingRight: holderWidth / 2 - 50,}}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => <Holder hotel={item} index={index} />}
                        snapToInterval={holderWidth}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                }}>
                    <Text style={{fontWeight: 'bold', color: "black"}}> Popular Hotels </Text>
                    <Text style={{ color: "black"}}> Show All </Text>
                </View>
                
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={Hotels}
                    contentContainerStyle={{
                        marginTop: 20,
                        paddingLeft: 20,
                        paddingBottom: 30,
                    }}
                    renderItem ={({item}) => <PopularHotel hotel={item} />}

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


