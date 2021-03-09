import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Image, TouchableOpacity, TextInput, Platform} from 'react-native';
//import { TextInput } from 'react-native-gesture-handler';

export default function Login() {
 
  const[display, setDisplay]=useState('none');
 return (
   <KeyboardAvoidingView style={styles.container}>
        <View style={styles.container}>
            
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.loginMsg(display)}>Usuário ou Senha inválidos!</Text>
            <TextInput 
              placeholder='Usuário:'
              style={styles.loginInput} 
            />
            <TextInput style={styles.loginInput} placeholder='Senha:' secureTextEntry={true} />

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => setDisplay('flex')}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
   </KeyboardAvoidingView>  
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333'
    },
    logo:{
      width:150,
      height: 150
    },
    loginMsg:(text='none')=>({
      fontWeight: "bold",
      fontSize: 22,
      color: "red",
      marginTop: 10,
      marginBottom: 10,
      display: text
    }),
    loginInput:{
      marginTop:15,
      backgroundColor:"#FFF",
      fontSize: 16,
      padding: 7,
      marginBottom: 1,
      width: 300
    },
    loginButton:{
      width: 300,
      height:42,
      padding: 12,
      backgroundColor: '#FFF',
      marginTop:10,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5
    },
    loginButtonText:{
      fontWeight: "bold",
      fontSize: 16,
      color: "#333"
    }


});