import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Tickets from '../Tickets';

export default function Footer() {
 return (
   <View>
       <Text style={styles.title}>VEJA TAMBÉM ESSES EVENTOS</Text>
       <View style={{flexDirection: 'row'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{marginHorizontal: 10}}>
                <Tickets img={require('../../assets/1.png')} cost="GRATIS">
                    Evento 1   
                </Tickets>
            </View>
            <View style={{marginHorizontal: 10}}>
                <Tickets img={require('../../assets/2.png')} cost="111,00">
                    Evento 2
                </Tickets>
            </View>
            <View style={{marginHorizontal: 10}}>
                <Tickets img={require('../../assets/3.png')} cost="GRATIS">
                    Evento 3
                </Tickets>
            </View>
        </ScrollView> 
       </View>
   </View>
  );
}

const styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontFamily: 'Anton_400Regular',
        marginVertical: '2%',
        paddingHorizontal: '2%',
    }
})