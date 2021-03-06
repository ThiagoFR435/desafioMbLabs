import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'

import Home from './pages/Home/';
import Detail from './pages/Detail/';
import Login from './pages/Login/';
import Areauser from './pages/Areauser';
import Perfil from './pages/Areauser/Perfil'
import Pedidos from './pages/Areauser/Pedidos'
import Sucesso from './pages/Sucesso/';

const Stack = createStackNavigator();


function Routes(){
    
    return(
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name ="Home"
                    component={Home}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name ="Detail"
                    component={Detail}
                    options={{
                        headerRight: () => (
                            <TouchableOpacity style={{marginRight: 20}}>
                                <Feather 
                                    name=""
                                    size={24}
                                    color="black"
                                />
                                
                            </TouchableOpacity>
                        )
                    }}
                    />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Areauser"
                    component={Areauser}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{headerShown: true}}
                />
                <Stack.Screen
                    name="Pedidos"
                    component={Pedidos}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Sucesso"
                    component={Sucesso}
                    options={{headerShown: false}}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
    
}


export default Routes;