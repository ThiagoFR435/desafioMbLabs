import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Button} from 'react-native';
import Footer from '../../component/Footer';
import api from '../../services/api.js';
import { useNavigation } from '@react-navigation/native';
import  {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';


export default function Detail({route, navigation}) {

  const [evento, setEvento] = React.useState([]);
  const { itemId } = route.params;
  const [idUser, setIdUser] = useState(null);

  /*navigation.setOptions({
    headerTitle: 'Página de Detalhes'
  })*/

  React.useEffect(() =>{

    async function getIdUser(){
      let response=await AsyncStorage.getItem('userData');
      let json=JSON.parse(response);
      //console.log(json.id);
      setIdUser(json.id);
      return json.id;
    }
    getIdUser();

    api.get(`/evento/${itemId}`).then((response) =>{
      //console.log(response.data);
      setEvento(response.data[0]);
      //console.log(evento);
      navigation.setOptions ({
        headerTitle: response.data[0].titulo
      })
  });
  }, []);

  function enviarCompra(idEvento,idUsuario,confirmacaopg,valor) {

    //console.log("Entrou",idEvento,idUsuario,confirmacaopg,valor);
    api.post(`/pedido/${idUsuario}`, {
      idEvento: idEvento,
      confirmacaopg: confirmacaopg,
      valor: valor
    })
    .then(function (response) {
      //console.log(response);
      navigation.navigate('Sucesso')
    })
    .catch(function (error) {
      console.log(error);
    });

}
 return (
   
   <ScrollView style={styles.container}>
     <View style={styles.ImgViewContainer}>
      <Image style={{ width:175, height:175, borderRadius: 10 }}
        source={{ uri: evento.foto}}
      />
     </View>

      
      <Text>User Id:{idUser}</Text>
      <Text>Id Evento: {evento.id} </Text>
      <Text>Evento: {evento.titulo}</Text>
      <Text>Desc: {evento.desc}</Text>
      <Text>Tipo: {evento.tipo}</Text>
      <Text>Valor: {evento.valor}</Text>

      <View style={styles.line}/>

      <Button title="Comprar" onPress={() => enviarCompra(evento.id,idUser,"Pago",evento.valor)} />
   </ScrollView>

  );
  
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 25
  },
  ImgViewContainer: {

  },
  image:{
    width: '100%'
  },
  title:{
    fontFamily: 'Anton_400Regular',
    paddingHorizontal: '2%'
  },
  textContent:{
    fontSize: 16,
    lineHeight: 25,
    marginVertical: '2%',
    paddingHorizontal: '2%'
  },
  textTitle: {
    fontSize: 22,
    marginVertical: '2%'
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