import React from 'react';
import { View, Text, StyleSheet , ScrollView, Image, TouchableOpacity, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import Tickets from '../../component/Tickets'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react/cjs/react.production.min';
import api from '../../services/api.js';
console.disableYellowBox = true;


export default function Home() {
    
  const navigation = useNavigation();
  var rs = "R$";

  const [eventos, setEventos] = React.useState([]);

  React.useEffect(() =>{
    api.get("/evento").then((response) =>{
      //console.log(response.data);
      setEventos(response.data);
  });
  }, []);
  
 return (

   <View style={styles.container}>
      <View style={styles.header}>
        <Image
        source={require('../../assets/bannerSmall.png')}
        style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Eventos</Text>
          <TouchableOpacity style={{position:'absolute', right: 0, alignSelf: 'center'}}>
          <FontAwesome
           name="user-circle-o" 
           size={24} 
           color="black" 
           onPress={() => navigation.navigate('Areauser')}
           />
          </TouchableOpacity>
        </View>
    </View>
        <View style={styles.line} />
        <ScrollView>
        
        <FlatList
          numColumns={2}
          data={eventos}
          keyExtractor={(eventos) => eventos.id}
          renderItem={({ item })=>(
            <TouchableOpacity onPress={() => navigation.navigate('Detail',{itemId: item.id})}>
                <View style={styles.item}>
                <View style={styles.item2}>
                  <Image style={{width:175, height:175}}source={{ uri: item.foto}}/>
                  <Text style={styles.ticketText}>
                    {item.titulo}
                  </Text>
                  <Text style={styles.valorText}>
                    R${item.valor}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        </ScrollView>
        
      </View>
  );
}


const pressHandler = (id) =>{
  console.log(id)
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    backgroundColor: '#FFF'
  },
  header:{
    marginBottom: 8
  },
  image:{
    width:'100%'
    
  },
  textContainer:{
    flexDirection: 'row',
    marginVertical: '5%',
    marginHorizontal: '5%'
  },
  text:{
    fontFamily: 'Anton_400Regular',
    fontSize: 26,
    marginHorizontal: '1%'
  },
  line:{
    borderBottomColor: '#D8d8d8',
    borderBottomWidth: 2,
  },
  textIngresso:{
    fontFamily: 'Anton_400Regular',
    fontSize: 26,
    marginHorizontal: '4%'
  },
  item:{
    marginHorizontal: 15,
    marginTop: 10,
    alignSelf: 'center'
  },
  item2:{
    paddingVertical: '2%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ticketText:{
       
    fontSize: 16
},
valorText:{
       
  opacity: 0.5,
}
});