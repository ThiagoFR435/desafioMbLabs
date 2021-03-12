import AsyncStorage from '@react-native-community/async-storage';
import { Assets } from '@react-navigation/stack';
import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity,TextInput, StyleSheet, FlatList, ScrollView} from 'react-native';
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
  const [pedidos, setPedidos] = useState(null);
  const [eventos, setEventos] = useState(null);

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
      });
      //Responsavel por listar todos os pedidos pelo id do usuario
        let result2=await api.get(`/pedido/${id}`).then((response) =>{
        console.log(response.data);
        setPedidos (response.data);
        return response.data;
        
    });
     const idEvento = result2[0].idEvento
      let result3=await api.get(`/evento/${idEvento}`).then((response) =>{
      //console.log(response.data);
      setEventos=(response.data);
      return response.data;
  });
  
    setConfirmacaoPg(result2[0].confirmacaopg);
    setValor(result2[0].valor);
    setCreateAt(result2[0].createdAt);
    setTitulo(result3[0].titulo);
  }
    getDados();
      
}, []);
  
  

 return (
    <View style={styles.container}>
      <MenuArea title='Pedidos' navigation={navigation}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <FlatList
          data={pedidos}
          keyExtractor={(pedidos) => Pedido.id}
          renderItem={PedidoShow}
        />
      </ScrollView>
      <View>
        <Text></Text>
      </View>

    </View>
  );
}

function PedidoShow(item)
{
  const {id, idEvento, confirmacaopg, valor, createdAt} = item.item
  return(

    <View style={styles.item}>
      <Text>Número do pedido: {id}</Text>
      <Text>Evento: {idEvento}</Text>
      <Text>Status: {confirmacaopg}</Text>
      <Text>Valor: R${valor}</Text>
      <Text>Data da compra: {createdAt}</Text>
      <Text></Text>

    </View>
    
  )
}

const styles = StyleSheet.create({
    
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  item:{
    
  }
  });