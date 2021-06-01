import React from 'react'
import { View, Text } from 'react-native'
// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// Screens
import LoginScreen from '../screens/LoginScreen';
import EmailScreen from '../screens/EmailScreen';
import EmailMainScreen from '../screens/EmailMainScreen';
import ContentScreen from '../screens/ContentScreen';
import TermsScreen from '../screens/TermsScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'vertical',
        animationEnabled: false,
      }}
      mode={'card'}
    >
      <Stack.Screen name='Terms' component={TermsScreen} options={{ headerShown:false }} />
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown:false }} />
      <Stack.Screen name='Email' component={EmailScreen} options={{ headerShown:false }} />
      <Stack.Screen 
        name='Content' 
        component={ContentScreen} 
        options={{
          title: 'Atrás',
          headerStyle: {
            backgroundColor: '#1A1A1F',
            shadowColor: 'transparent'
          },
          headerTintColor: '#FFF'
        }}
      />
      <Stack.Screen 
        name='EmailNow' 
        component={EmailMainScreen} 
        options={{
          title: 'Todos los emails',
          headerStyle: {
            backgroundColor: '#1A1A1F',
            shadowColor: 'transparent'
          },
          headerTintColor: '#FFF'
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
}

const StackNavigator = () => {
  return (
    <View>
      <AppStack />
    </View>
  )
}

export default StackNavigator
