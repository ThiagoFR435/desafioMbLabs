import AsyncStorage from "@react-native-community/async-storage";
import { Assets } from "@react-navigation/stack";
import React from "react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
     View,
     Text,
     TouchableOpacity,
     TextInput,
     StyleSheet,
     FlatList,
     ScrollView,
} from "react-native";
import { set } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import MenuArea from "../../../component/MenuArea";
import api from "../../../services/api.js";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

export default function Pedido({ navigation }) {
     const [idUser, setIdUser] = useState(null);
     const [confirmacaopg, setConfirmacaoPg] = useState(null);
     const [valor, setValor] = useState(null);
     const [creatAt, setCreateAt] = useState(null);
     const [titulo, setTitulo] = useState(null);
     const [pedidos, setPedidos] = useState(null);
     const [eventos, setEventos] = useState(null);

     useEffect(() => {
          async function getIdUser() {
               let response = await AsyncStorage.getItem("userData");
               let json = JSON.parse(response);
               //console.log(json.id);
               setIdUser(json.id);
               return json.id;
          }
          getIdUser();
          async function getDados() {
               const id = await getIdUser();
               let result = await api.get(`/usuario/${id}`).then((response) => {
                    return response.data;
               });

               //Responsavel por listar todos os pedidos pelo id do usuario
               let result2 = await api.get(`/pedido/${id}`).then((response) => {
                    let listaTotal = response.data;
                    listaTotal[0].titulo = '';

                    listaTotal.forEach(function (datalista, i) {
                         let listaPedidos = api
                              .get(`/evento/${datalista.idEvento}`)
                              .then((responseLista) => {
                                   listaTotal[i].titulo =
                                        responseLista.data[0].titulo;
                              });
                    });

                    setPedidos(listaTotal);
                    return pedidos;
               });
               //Responsavel por detalhar o evento
               const idEvento = result2[0].idEvento;
               let result3 = await api
                    .get(`/evento/${idEvento}`)
                    .then((response) => {
                         setEventos = response.data;
                         setTitulo(response.data[0].titulo);
                         return response.data;
                    });
               setConfirmacaoPg(result2[0].confirmacaopg);
               setValor(result2[0].valor);
               setCreateAt(result2[0].createdAt);
               setTitulo(result3[0].titulo);
          }
          getDados();
     }, []);

     return (
          <View style={styles.container}>
               <MenuArea title="Pedidos" navigation={navigation} />
               <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
               >
                    <FlatList
                         data={pedidos}
                         keyExtractor={(pedidos) => Pedido.id}
                         renderItem={PedidoShow}
                    />
               </ScrollView>
               <View>
                    <Text></Text>
               </View>
          </View>
     );
}

function PedidoShow(item) {
     const { id, titulo, confirmacaopg, valor, createdAt } = item.item; 
     var dataFormatada = format(new Date(createdAt), "dd/MM/yyyy");

     return (
          <Card style={styles.card}>
               <Card.Content>
                    <Title>Pedido N?? {id}</Title>
                    <Paragraph>Evento: {titulo}</Paragraph>
                    <Paragraph>Situa????o: {confirmacaopg}</Paragraph>
                    <Paragraph>Valor: R${valor}</Paragraph>
                    <Paragraph>Data da compra: {dataFormatada}</Paragraph>
               </Card.Content>
          </Card>
     );
}
const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#f5f5f5",
          alignItems: "center",
          justifyContent: "flex-start",
     },
     text: {
          fontSize: 30,
          lineHeight: 20,
     },
     content: {
          fontSize: 20,
          lineHeight: 20,
          marginVertical: "2%",
          paddingHorizontal: "18%",
          paddingVertical: "2%",
          borderWidth: 1,
          borderRadius: 18,
          borderColor: "#cccccc",
     },
     info: {
          justifyContent: "flex-start",
          alignSelf: "flex-start",
          paddingLeft: "2%",
     },
     card: {
          paddingLeft: "20%",
          paddingRight: "20%",
          marginVertical: 10,
          marginHorizontal: "1%",
          paddingHorizontal: "10%",
          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
     },
});
