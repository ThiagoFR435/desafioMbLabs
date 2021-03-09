import React from 'react';
import { View, Text, StyleSheet , ScrollView, Image, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import Tickets from '../../component/Tickets'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';

export default function Home() {
const navigation = useNavigation();

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
           onPress={() => navigation.navigate('Profile')}
           />
          </TouchableOpacity>
        </View>
    </View>
        <View style={styles.line} />
       
        <ScrollView>
        <Text style={styles.textIngresso}>Ingressos</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Tickets img={require('../../assets/1.png')} cost='Grátiss' onClick={() => navigation.navigate('Login')}>
            Evento PUC Campinas
          </Tickets>
          <Tickets img={require('../../assets/2.png')} cost='R$ 110,00'onClick={() => navigation.navigate('Detail')}>
            Evento PUC Campinas
          </Tickets>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Tickets img={require('../../assets/3.png')} cost='R$220,00'onClick={() => alert('Clicou')}>
            Evento PUC Campinas
          </Tickets>
          <Tickets img={require('../../assets/4.png')} cost='R$ 111,00'onClick={() => alert('Clicou')}>
            Evento PUC Campinas
          </Tickets>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Tickets img={require('../../assets/5.png')} cost='R$222,00'onClick={() => alert('Clicou')}>
            Evento PUC Campinas
          </Tickets>
          <Tickets img={require('../../assets/6.png')} cost='R$ 300,00'onClick={() => alert('Clicou')}>
            Evento PUC Campinas
          </Tickets>
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