import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Tickets(props) {
    
    function filterDesc(desc){
        if(desc.length < 27){
            return desc;
        }

        return `${desc.substring(0,22)}...`;
    }

 return (
   <TouchableOpacity style={styles.container} onPress={props.onClick}>
       <Image
        source={props.img}
        style={styles.ticketImg}
       />
       <Text style={styles.ticketText}>
       {filterDesc(props.children)} 
       </Text>
       <View opacity={0.65}>
           <Text style={styles.ticketText}>{props.cost}</Text>
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