import React from 'react'
import { View, Text } from 'react-native'
// React Navigation
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// Screens
import LoginScreen from '../screens/LoginScreen';
import EmailScreen from '../screens/EmailScreen';
import EmailMainScreen from '../screens/EmailMainScreen';

// const Stack = createStackNavigator();


const StackNavigator = () => {
  return (
    <View>
      <EmailScreen />
    </View>
  )
}

export default StackNavigator
