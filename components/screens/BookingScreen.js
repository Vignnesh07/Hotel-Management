import React, {Component} from "react";
import {Text,View} from "react-native";



export default class BookingScreen extends Component{
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{ fontSize:50}}>Booking</Text>
            </View>

        )
    }
}