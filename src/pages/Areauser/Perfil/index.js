import AsyncStorage from '@react-native-community/async-storage';
import { Assets } from '@react-navigation/stack';
import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity,TextInput, StyleSheet} from 'react-native';
import { set } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuArea from '../../../component/MenuArea';
import api from '../../../services/api.js';


export default function Perfil({navigation}) {

  const [idUser, setIdUser ] = useState(null);
  const [nome, setNome ] = useState(null);
  const [sobrenome, setSobrenome ] = useState(null);
  const [email, setEmail ] = useState(null);

  useEffect(()=>{
      async function getIdUser(){
        let response=await AsyncStorage.getItem('userData');
        let json=JSON.parse(response);
        //console.log(json.id);
        setIdUser(json.id);
        return json.id;
      }
      getIdUser();
      async function getDados(){
        const id = await getIdUser();
        //console.log("Resultado" , id);
        let result=await api.get(`/usuario/${id}`).then((response) =>{
          //console.log(response.data);
          return response.data;
          //setInfos(response.data);
      });
    //console.log(result[0]);
    
    setNome(result[0].nome);
    setSobrenome(result[0].sobrenome);
    setEmail(result[0].email);

  }
    getDados();
      
}, []);
  
  


 return (
    <View style={styles.container}>
      <MenuArea title='Perfil' navigation={navigation}/>
      <View>
        <Text>{nome}</Text>
        <Text>{sobrenome}</Text>
        <Text>{email}</Text>
      </View>
      <View>
        <Text>{idUser}</Text>
       
      </View>

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