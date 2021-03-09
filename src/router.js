import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'


import Home from './pages/Home/';
import Detail from './pages/Detail/';
import Login from './pages/Login/';
import Profile from './pages/Profile/';
import Cart from './pages/Cart/';

const Stack = createStackNavigator();


function Routes(){
    
    return(
        <NavigationContainer>
           
            <Stack.Navigator>
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
                                    name="shopping-cart"
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
                    name="Profile"
                    component={Profile}
                    options={{headerShown: true}}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{headerShown: true}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Routes;