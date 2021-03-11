import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Tickets(props) {
    
    

 return (
   <TouchableOpacity style={styles.container} onPress={props.onClick}>
       <Image
        source={props.img}
        style={styles.ticketImg}
       />
       <View style={styles.ticketText}>
            <Text style={styles.ticketText}>{props.text}</Text>
       </View>
       <View opacity={0.65}>
           <Text style={styles.ticketText}>R${props.cost}</Text>
       </View>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ticketImg:{
        width: 175,
        height: 175
    },
    ticketText:{
       
        fontSize: 16
    }
});