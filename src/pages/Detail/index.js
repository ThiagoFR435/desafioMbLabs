import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,} from 'react-native';
import Button from '../../component/Button';
import Footer from '../../component/Footer';
import api from '../../services/api.js';


export default function Detail({navigation}) {

  navigation.setOptions({
    headerTitle: 'Pagina de Detalhes'
  })

  const [evento, setEvento] = React.useState([]);
  

  React.useEffect(() =>{
    api.get("/evento/11").then((response) =>{
      //console.log(response.data);
      setEvento(response.data[0]);
      //console.log(evento);
  });
  }, []);

 return (
   <ScrollView style={styles.container}>
   <Image
    source={require('../../assets/bannerSmall.png')}
    style={styles.image}
    resizeMode="cover"
   />
  
  <Text>Id Evento: {evento.id} </Text>
  <Text>URL Foto: {evento.foto} </Text>
  <Text>Evento: {evento.titulo}</Text>
  <Text>Desc: {evento.desc}</Text>
  <Text>Tipo: {evento.tipo}</Text>
  <Text>Valor: {evento.valor}</Text>

   </ScrollView>
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