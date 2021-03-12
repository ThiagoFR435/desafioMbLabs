import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../../../node_modules/react-native-vector-icons/dist/FontAwesome';
import { useState } from 'react';
import { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Perfil from './Perfil';
import Pedidos from './Pedidos';

export default function Areauser({navigation}) {

  const [user,setUser] = useState(null);
  const Tab = createMaterialBottomTabNavigator();

  useEffect(()=>{
    async function getUser(){
      let response=await AsyncStorage.getItem('userData');
      let json=JSON.parse(response);
      setUser(json.nome);
    }
    getUser();
  },[]);

  navigation.setOptions({
    headerTitle: 'Área do Usuário'
  })

 return (
      <Tab.Navigator
        activeColor='#000'
        inactiveColor='#847C7C'
        barStyle={styles.areaTab}
      >
      <Tab.Screen 
        name="Perfil" 
        component={Perfil}
        options={{
          tabBarIcon: ()=>(
            <Icon name="user" size={25} color="#000"/>
          )
        }}
      />
      <Tab.Screen
        name="Pedidos" 
        component={Pedidos}
        options={{
          tabBarIcon: ()=>(
            <Icon name="ticket" size={25} color="#000"/>
          )
        }}
      />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    backgroundColor: '#FFF'
  },
  areaTab:{
    backgroundColor:'#fff',
    fontSize:22,
    fontWeight:'bold',
    textShadowColor: '#000',
    borderColor: '#000',
    borderTopWidth: 0.2
  },
  textList:{
    fontSize: 22,
    lineHeight: 25,
  },
  
});