import React from 'react';
import { View , Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Sucesso({navigation}) {
 return (
   <View>
       <Text>
           Seu pedido foi realizado com sucesso!
       </Text>
       <Button title="Voltar ao menu inicial" onPress={() => navigation.navigate('Home')} />
   </View>
  );
}