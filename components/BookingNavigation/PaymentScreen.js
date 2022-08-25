import React, {Component, useState} from "react";
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, StatusBar, Image, Button, useWindowDimensions, TextBase, TouchableNativeFeedback} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import {useNavigate} from 'react-router-dom';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
import { PaymentIcon } from 'react-native-payment-icons';
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from '../const/color'
import { Modal } from "./modal";

const PaymentScreen = ({navigation, route}) => {

    const item = route.params; 
    console.log(item);

    const dayCounter = route.params;
    console.log(dayCounter);

    const [value, setValue] = React.useState('visa');

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);  
    
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
                        }}>Pay RM{item.price}
                    </Text>
                </View>

                <View style={styles.radioButton}>
                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                        <RadioButton.Item label="Visa Card" value="visa" />
                        <RadioButton.Item label="Master Card" value="master" />
                        <RadioButton.Item label="Touch and Go" value="tng" />
                        <RadioButton.Item label="Grab Pay" value="grab" />
                    </RadioButton.Group>
                </View>


                <View>
                    <TouchableOpacity onPress={handleModal}>
                        <View style={styles.bookButton}>
                            <Text style={{color: Colors.white, fontSize: 18, fontWeight: 'bold'}}>Pay Now</Text>
                        </View>
                    </TouchableOpacity>
                    <Modal isVisible={isModalVisible}>
                        <Modal.Container>
                        <Modal.Header title="Payment Successful" />
                        <Modal.Body>
                            <Text style={styles.text}>Thank You</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button title="View Booking" onPress = {() => navigation.navigate('Upcoming', item, dayCounter)} />
                        </Modal.Footer>
                        </Modal.Container>
                    </Modal>
                </View>

            </View>
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