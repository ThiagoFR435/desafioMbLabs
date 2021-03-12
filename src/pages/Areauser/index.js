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
        activeColor='#999'
        inactiveColor='#fff'
        barStyle={styles.areaTab}
      >
      <Tab.Screen 
        name="Perfil" 
        component={Perfil}
        options={{
          tabBarIcon: ()=>(
            <Icon name="user" size={20} color="#fff"/>
          )
        }}
      />
      <Tab.Screen
        name="Pedidos" 
        component={Pedidos}
        options={{
          tabBarIcon: ()=>(
            <Icon name="ticket" size={20} color="#fff"/>
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
    backgroundColor:'#000',
    fontSize:20,
    fontWeight:'bold',
    color:'#000'
  },
  image:{
    width: '100%'
  },
  title:{
    fontFamily: 'Anton_400Regular',
    paddingHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContent:{
    fontSize: 16,
    lineHeight: 25,
    marginVertical: '2%',
    paddingHorizontal: '2%'
  },
  textTitle: {
    fontSize: 22,
    marginVertical: '2%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textList:{
    fontSize: 16,
    lineHeight: 25,
  },
  line:{
    borderWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: '2%',
  }
});