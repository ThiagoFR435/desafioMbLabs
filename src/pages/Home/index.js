import React from 'react';
import { View, Text, StyleSheet , ScrollView, Image, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import Tickets from '../../component/Tickets'

export default function Home() {
 return (
   <View style={styles.container}>
      <View style={styles.header}>
        <Image
        source={require('../../assets/banner.png')}
        style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.text}>Empresas</Text>
          <Text style={styles.text}>-</Text>
          <Text style={styles.text}>Universidades</Text>
          <TouchableOpacity style={{position:'absolute', right: 0, alignSelf: 'center'}}>
              <MaterialIcons
                name='filter-list'
                size={24}
                color="#000"
              />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <ScrollView>
        <Text style={styles.text}>Ingressos</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Tickets/>
          <Tickets/>

        </View>
          
        </ScrollView>
      </View>
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
    width:'100%',
    height: '35%'
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
  }
});