import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, Image, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";
import RBSheet from "react-native-raw-bottom-sheet";
import SwipeRender from "react-native-swipe-render";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const LoginScreen = () => {

  const [ buttonText, setButtonText ] = useState('')

  const onSignIn = async () => {
    await NetInfo.fetch().then(state => {
      if (state.isConnected == true){
        setButtonText('Empecemos!');
        // navigation to email
      } else {
        setButtonText('Se necesita Internet')
      }
    })
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#1A1A1F'} barStyle='light-content' />
      <RBSheet
        closeOnPressBack={true}
        animationType='fade'
        closeOnDragDown={false}
        openDuration={300}
        customStyles={{
          container: {
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
            height:"30%",
            backgroundColor:"#1A1A1F"
          }
        }}
      >
        <SwipeRender
          index={0} // default 0
          loop={false} // default false
          loadMinimal={true} // default false
          loadMinimalSize={2}
          autoplay={true} // default false
          horizontal={true} // default true
          showsPagination={true}
          autoplayTimeout={3}
          bounces={true}
        >
          <View style={styles.mainViewSwipe}>
            <Image 
              resizeMode='contain'
              source={{ uri: '../assets/swipe.png'}}
              style={styles.imageStyle}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '60%'}}>
              <Text style={styles.textHeader}>¿A qué esperas?</Text>
              <TouchableOpacity onPress={onSignIn} style={styles.letStart}>

              </TouchableOpacity>
            </View>
          </View>
        </SwipeRender>
      </RBSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: '#1A1A1F'
  },
  mainViewSwipe: {
    height: '80%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageStyle: {
    height: '50%',
    width: '30%'
  },
  textHeader: {
    color: '#F1F1F1',
    fontSize: 17,
    textAlign: 'center'
  }
  
})

export default LoginScreen
