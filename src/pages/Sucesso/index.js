import React from 'react';
import { View , Text, Button, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Sucesso({navigation}) {
 return (
   <View>
       
       <Image
        style={styles.image}
        source={require('../../assets/sucesso.png')}
      />
      <Text style={styles.text} >
           Seu pedido foi realizado com sucesso!
      </Text>
       <Button style={styles.button} title="Voltar ao menu inicial" onPress={() => navigation.navigate('Home')} />
      <Text></Text>
      <Button style={styles.button} title="Ir para meus pedidos" onPress={() => navigation.navigate('Pedidos')} />
   </View>
  );
}

const styles = StyleSheet.create({

  image:{
    marginVertical: '10%',
    width:175, 
    height:175,
    borderRadius: 10, 
    alignSelf: 'center'
  },
  text:{
    fontFamily: 'Anton_400Regular',
    alignSelf: 'center',
    marginVertical: '2%',
    paddingHorizontal: '2%',
    fontSize: 20,
  },
  button:{
    flex: 1,
    borderRadius: 10, 
    alignSelf: 'center',
    textTransform: "uppercase",
    
  }
})