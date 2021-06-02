import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native"
import { AntDesign } from "@expo/vector-icons";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


const TermsScreen = ({ navigation }) => {

  const onBack = () => {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1A1A1F" barStyle="light-content"/>
        <View style={styles.emailBoxView}>
          <Image 
            source={require('../assets/astronaut.png')} 
            resizeMode="contain" 
            style={styles.imgView} 
          />
        </View>

        <View style={styles.textMainView}>
          <ScrollView>
            <Text style={styles.textStyle}>{'Al utilizar nuestros servicios, usted acepta nuestra política de privacidad, que describe cómo almacenamos la información.'}</Text>
            <Text style={styles.textStyle}>{'Su dirección de correo electrónico temporal es completamente anónima. Su dirección de correo electrónico se autodestruye automáticamente a medida que transcurre el tiempo.'}</Text>
            <Text style={styles.textStyle}>{'Mailine no permite a los usuarios añadir imágenes en los correos debido a las siguientes razones:'}</Text>
            <Text style={styles.textStyle}>{'1. Robo en línea'}</Text>
            <Text style={styles.textStyle}>{'2. Uso indebido de la aplicación para otros fines.'}</Text>
            <Text style={styles.textStyle}>{'La dirección de correo electrónico temporal que puede obtener en temp mail puede servir para un gran número de propósitos.'}</Text>
            <Text style={styles.textStyle}>{'Su función principal es la de proteger su confidencialidad cuando navega por Internet y Made Only para fines de verificación.'}</Text>
          </ScrollView>
        </View>        

        <View style={styles.signinView}>
          <TouchableOpacity style={styles.signinButton} onPress={onBack}>
            <AntDesign name="heart" size={20} color="#FFF" style={{marginLeft:"5%"}}/>
            <Text style={styles.signinText}> Ok llévame de vuelta </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height,
    width,
    backgroundColor:"#1A1A1F"
  },
  imgView:{
    height:"100%",
    width:"100%"
  },
  emailBoxView:{
    height:"20%",
    width:"100%",
    marginTop:"10%"
  },
  textMainView:{
    height:"50%",
    width:"90%",
    marginLeft:"5%",
    marginTop:"10%",
  },
  textStyle:{
    color:"#FFF",
    fontSize:16,
  },
  signinView:{
    height:"20%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
  },
  signinButton:{
    height:"35%",
    width:"80%",
    backgroundColor:"#e36f62",
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    shadowColor: '#1A1A1F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  signinText:{
    fontSize:14,
    color:"#FFF",
    marginLeft:"5%"
  },
})

export default TermsScreen
