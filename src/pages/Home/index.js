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
        
        <Text style={styles.textIngresso}>
          Ingressos 
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Tickets img={require('../../assets/1.png')} text = {eventos[0]?.titulo} cost= {eventos[0]?.valor} onClick={() => navigation.navigate('Detail')}></Tickets>
          <Tickets img={require('../../assets/2.png')} text = {eventos[1]?.titulo} cost={eventos[1]?.valor} onClick={() => navigation.navigate('Detail')}></Tickets>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Tickets img={require('../../assets/1.png')} text = {eventos[2]?.titulo} cost= {eventos[2]?.valor} onClick={() => navigation.navigate('Detail')}></Tickets>
          <Tickets img={require('../../assets/2.png')} text = {eventos[3]?.titulo} cost={eventos[3]?.valor} onClick={() => navigation.navigate('Detail')}></Tickets>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Tickets img={require('../../assets/1.png')} text = {eventos[3]?.titulo} cost= {eventos[4]?.valor} onClick={() => navigation.navigate('Detail')}></Tickets>
          <Tickets img={require('../../assets/2.png')} text = {eventos[4]?.titulo} cost={eventos[4]?.valor} onClick={() => navigation.navigate('Detail')}></Tickets>
        </View>  

        </ScrollView>
        
      </View>
  );
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
  }
});