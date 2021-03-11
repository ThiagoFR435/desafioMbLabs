import AsyncStorage from '@react-native-community/async-storage';
import { Assets } from '@react-navigation/stack';
import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity,TextInput, StyleSheet} from 'react-native';
import { set } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuArea from '../../../component/MenuArea';
import api from '../../../services/api.js';


export default function Pedido({navigation}) {

  const [idUser, setIdUser ] = useState(null);
  const [confirmacaopg, setConfirmacaoPg ] = useState(null);
  const [valor, setValor ] = useState(null);
  const [creatAt, setCreateAt ] = useState(null);
  const [titulo, setTitulo] = useState(null);

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
        let result2=await api.get(`/pedido/${id}`).then((response) =>{
        //console.log(response.data);
        return response.data;
        //setInfos(response.data);
    });
     const idEvento = result2[0].idEvento
      let result3=await api.get(`/evento/${idEvento}`).then((response) =>{
      //console.log(response.data);
      return response.data;
      //setInfos(response.data);
  });
    //console.log(result3[0].titulo);
    
    setConfirmacaoPg(result2[0].confirmacaopg);
    setValor(result2[0].valor);
    setCreateAt(result2[0].createdAt);
    setTitulo(result3[0].titulo);
  }
    getDados();
      
}, []);
  
  


 return (
    <View style={styles.container}>
      <MenuArea title='Pedido' navigation={navigation}/>
      <View>
        <Text>Pedidos</Text>
        <Text>{titulo}</Text>
        <Text>{valor}</Text>
        <Text>{confirmacaopg}</Text>
        <Text>{creatAt}</Text>
      </View>
      <View>
        <Text></Text>
       
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