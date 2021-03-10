import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuArea from '../../../component/MenuArea';


export default function Pedidos({navigation}) {
 
 return (
    <View style={styles.container}>
      <MenuArea title='Pedidos' navigation={navigation}/>
    </View>
  );
}



const styles = StyleSheet.create({
    
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'flex-start'
  }
  });