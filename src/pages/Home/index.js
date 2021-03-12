import React from 'react';
import { View, Text, StyleSheet , ScrollView, Image, TouchableOpacity, FlatList, TextInput} from 'react-native';
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
  const [filterData, setfilterData] = React.useState([]);
  const [masterData, setmasterData] = React.useState([]);
  const [search, setsearch] = React.useState('');

  React.useEffect(() =>{
    api.get("/evento").then((response) =>{
      //console.log(response.data);
      setEventos(response.data);
      setfilterData(response.data);
      setmasterData(response.data);
  });
  }, []);

  const searchFilter = (text) =>{
    if(text){
      const newData = masterData.filter((item) =>{
        const itemData = item.tipo.toUpperCase() ? item.tipo.toUpperCase()
              : '';
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setsearch(text);
    }else{
      setfilterData(masterData);
      setsearch(text);
    }
}

const ItemSeparatorView = () => {
  return(
    <View
      style={{height:0.5, width: '100%', backgroundColor:'#c8c8c8'}}
    />
  )
}

 return (

  

   <View style={styles.container}>
      <View style={styles.header}>
            
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
        <TextInput
                style={styles.textInputStyle}
                value={search}
                placeholder="Pesquise aqui"
                underlineColorAndroid = "trasparent"
                onChangeText={(text) => searchFilter(text)}
            />
    </View>
        <View style={styles.line} />
        <ScrollView>
        
        <FlatList
          numColumns={2}
          data={filterData}
          keyExtractor={(eventos) => eventos.id}
          ItemSeparatorComponent={ItemSeparatorView}
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


const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    backgroundColor: '#FFF',
    marginTop: 0,
  },
  textInputStyle:{
    height:40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    marginTop: 32,
    borderColor: '#333',
    backgroundColor: 'white'
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
    marginHorizontal: '5%',
    
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