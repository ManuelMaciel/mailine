import React from 'react'
import { View, Text } from 'react-native'
// React Navigation
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// Screens
import LoginScreen from '../screens/LoginScreen';

// const Stack = createStackNavigator();


const StackNavigator = () => {
  return (
    <View>
      <LoginScreen />
    </View>
  )
}

export default StackNavigator
