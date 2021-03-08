import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Tickets() {
 return (
   <TouchableOpacity>
       <Image
        source={require('../../assets/1.png')}
        style={styles.ticketImg}
       />
       <Text style={styles.ticketText}>
        Evento PUCC
       </Text>
       <Text style={styles.ticketText}>
        Grátis
       </Text>
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