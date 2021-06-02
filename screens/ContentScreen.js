import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  StatusBar
} from "react-native"
import SnackBar from 'react-native-snackbar-component'

const ContentScreen = ({ navigation, route }) => {

  const [ data, setData ] = useState('')
  const [ loading, setLoading ] = useState(true)
  const [ emailName, setEmailName ] =  useState(route.params.emailName)
  const [ emailDomain, setEmailDomain ] = useState(route.params.emailDomain)
  const [ emailId, setEmailId ] = useState(route.params.emailId)
  const [ visiblity, setVisiblity] = useState(true)

  useEffect(() => {
    seeMessageText();
    return () => {
      console.log('cleanup')
    }
  }, []);

  const seeMessage = () => {
    navigation.navigate("Terms")
    setVisiblity(false)
  };

  const seeMessageText = () => {
    fetch("https://www.1secmail.com/api/v1/?action=readMessage&login="+emailName+"&domain="+emailDomain+"&id="+emailId)
      .then((response) => response.json())
      .then((json) => {
        setLoading(true);
        setData(json["textBody"]);
        setVisiblity(false)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <StatusBar backgroundColor="#1A1A1F" barStyle="light-content"/>
        <ScrollView style={styles.container} >
          {loading ? <ActivityIndicator style={styles.activityIndicatorStyle} color="#FFF" /> : (
            <View style={styles.textContainer}>
              <Text selectable={true} style={styles.text}>{data}</Text>
            </View>
          )}  
        </ScrollView>
        <SnackBar 
          visible={visiblity} 
          textMessage="Sólo se mostrará el texto" actionHandler={seeMessage} actionText="Más información"
          backgroundColor="#121212" messageColor="#FFF" accentColor="#FFF" autoHidingTime={3000}
        />
      </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1A1A1F",
    height:"90%",
    width:"100%",
  },
  activityIndicatorStyle:{
    marginTop:"20%"
  },
  textContainer:{
    height:"90%",
    width:"90%",
    marginLeft:"8%",
    marginTop:"10%"
  },
  text:{
    color:"#FFF"
  }
})


export default ContentScreen
