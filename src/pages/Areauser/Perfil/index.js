import AsyncStorage from '@react-native-community/async-storage';
import { Assets } from '@react-navigation/stack';
import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity,TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuArea from '../../../component/MenuArea';
import api from '../../../services/api.js';


//onChangeText={text=>setSenhaAntiga(text)}


export default function Perfil({navigation}) {

  const [idUser, setIdUser ] = useState(null);
  const [senhaAntiga, setSenhaAntiga ] = useState(null);
  const [novaSenha, setNovaSenha ] = useState(null);
  const [confNovaSenha, setConfNovaSenha ] = useState(null);
  const [msg, setMsg ] = useState(null);

  useEffect(()=>{
      async function getIdUser(){
        let response=await AsyncStorage.getItem('userData');
        let json=JSON.parse(response);
        //console.log(json.id);
        setIdUser(json.id);
      }
      getIdUser();
  });
  
  async function sendForm(){
    let response=await fetch('http://192.168.0.11:3000/verificaSenha',{
        method:'POST',
        body:JSON.stringify({
          id: idUser,
          senhaAntiga: senhaAntiga,
          novaSenha: novaSenha,
          confNovaSenha: confNovaSenha
        }),
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
    });

   let json=await response.json();
   setMsg(json);
  }

  const [info, setInfos] = React.useState([]);

  React.useEffect(() =>{
    api.get('/usuario/1').then((response) =>{
      console.log(response.data);
      setInfos(response.data);
  });
  }, []);

 return (
    <View style={styles.container}>
      <MenuArea title='Perfil' navigation={navigation}/>
      <View>
        <Text>Teste</Text>
      </View>
      <View>
        <Text>{msg}</Text>
        <TextInput placeholder='Senha Antiga' onChangeText={text=>setSenhaAntiga(text)}/>
        <TextInput placeholder='Nova Senha' onChangeText={text=>setNovaSenha(text)} />
        <TextInput placeholder='Confirme Nova Senha'onChangeText={text=>setConfNovaSenha(text)}/>
        <TouchableOpacity onPress={()=>sendForm()}>
          <Text>Trocar</Text>
        </TouchableOpacity>
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