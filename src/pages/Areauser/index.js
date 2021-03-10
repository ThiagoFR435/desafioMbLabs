import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

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
      <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    backgroundColor: '#FFF'
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