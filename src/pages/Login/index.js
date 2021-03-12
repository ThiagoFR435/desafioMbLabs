import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Image, TouchableOpacity, TextInput, Platform} from 'react-native';
import { set } from 'react-native-reanimated';
//import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';


export default function Login() {
 
  const[display, setDisplay]=useState('none');
  const[user, setUser]=useState(null);
  const[password, setPassword]=useState(null);
  const[login, setLogin]=useState(false);
  const navigation = useNavigation();

  useEffect(()=>{
      verifyLogin();
  },[]);

  useEffect(()=>{
    if(login===true){
      biometric();
    }
  },[login]);

  //Verifica se o usuario esta logado
  async function verifyLogin(){
    let response=await AsyncStorage.getItem('userData');
    let json=await JSON.parse(response);
    if(json != null){
      setUser(json.nome);
      setPassword(json.senha);
      setLogin(true);
    }
  }

  //Biometria
  async function biometric(){
    let compatible= await LocalAuthentication.hasHardwareAsync();
    if(compatible){
      let biometricRecords = await LocalAuthentication.isEnrolledAsync();
      if (biometricRecords){
        let result = await LocalAuthentication.authenticateAsync();
        if(result.success){
          sendForm();
        }else{
          setUser(null);
          setPassword(null);
        }
      }
    }
  }

  //Envio form login
  async function sendForm(){
    let response=await fetch('http://192.168.0.11:3000/login',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user,
          password: password
        })
    });

    let json=await response.json();
    console.log(json);
    if(json === 'errorSenha'){
      setDisplay('flex');
      setTimeout(()=>{
        setDisplay('none');
      },4000);
      await AsyncStorage.clear();

    }else{
      await AsyncStorage.setItem('userData', JSON.stringify(json));
      navigation.navigate('Home');
    }

  }

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
              onChangeText={text=>setUser(text)}
            />
            <TextInput 
              style={styles.loginInput} 
              placeholder='Senha:' 
              secureTextEntry={true} 
              onChangeText={text=>setPassword(text)}
            />

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => sendForm()}
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
        backgroundColor: '#f5f5f5'
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
      width: 300,
      borderColor: '#333', 
      borderWidth: 0.5,
      borderRadius: 10
    },
    loginButton:{
      width: 300,
      height:42,
      padding: 12,
      backgroundColor: '#333',
      marginTop:10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5
    },
    loginButtonText:{
      fontWeight: "bold",
      fontSize: 16,
      color: "#FFF"
    }


});