import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,} from 'react-native';

export default function Profile({navigation}) {

  navigation.setOptions({
    headerTitle: 'Pedidos'
  })

 return (
   <ScrollView style={styles.container}>
  
   <View style={styles.container}>
      <View>
        <Text style={[styles.title, {fontSize: 30}]}>Bem Vindo Thiago</Text>
      </View>
      <View opacity={0.6}>
        <Text style={[styles.title, {fontSize: 25} ]}>Seus Pedidos</Text>
      </View>

      <View style={styles.textContent}>
        <Text style={styles.textTitle}>
            Pedido 1 -
        </Text>
        <Text style={styles.textTitle} >
          Pedido 2 -
        </Text >
        <Text style={styles.textTitle}>
          Pedido 3 -
        </Text>
        <Text style={styles.textTitle}>
          Pedido 4 -
        </Text>
      </View>

   </View>
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
    paddingHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContent:{
    fontSize: 16,
    lineHeight: 25,
    marginVertical: '2%',
    paddingHorizontal: '2%'
  },
  textTitle: {
    fontSize: 22,
    marginVertical: '2%',
    alignItems: 'center',
    justifyContent: 'center'
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