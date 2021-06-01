import React, { useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  PanResponder,
  Animated,
  TouchableHighlight,
  StatusBar
} from "react-native"
import { Entypo } from '@expo/vector-icons';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const EmailMainScreen = ({ navigation }) => {

  const [ data, setData ] = useState([]) 
  const [ loading, setLoading ] = useState(true) 
  const [ email, setEmail ] = useState('')
  const [ emailFrom, setEmailFrom ] = useState('')
  const [ emailSubject, setEmailSubject ] = useState('')
  const [ emailDate, setEmailDate ] = useState('')
  const [ emailName, setEmailName ] = useState(route.params.email.split("@")[0])
  const [ emailDomain, setEmailDomain ] = useState(route.params.email.split("@")[1])
  const [ emailId, setEmailId ] = useState('')
  const [ value, setValue ] = useState(1)
  
  const colors = [
    "#00B0FF",
    "#00BFA6",
    "#F50057",
    "#536DFE",
    "#F9A826",
    "#F9A826",
  ]

  const generate=()=>{
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    return date+"-"+month+"-"+year
  }

  function getRndInteger(min, max) {
    return  Math.floor(Math.random() * (max - min) ) + min;
  }

  const OnPressNew = () => {
    fetch("https://www.1secmail.com/api/v1/?action=getMessages&login="+emailName+"&domain="+emailDomain)
      .then((response) => response.json())
      .then((json) => {
        setLoading(true)
        setData([])
        for (i in json){
          setEmailFrom(json[i]["from"])
          setEmailSubject(json[i]["subject"])
          setEmailDate(json[i]["date"])
          setEmailId(json[i]["id"])
          listformating()
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  const listformating = () => {
    const test = { 
        "emailFrom": emailFrom,
        "emailSubject": emailSubject,
        "emailDate": emailDate,
        "color":colors[getRndInteger(0,6)],
        "id": emailId
  }
    setData(test)
    setValue(data.length)
  }

  const onPressProps = (id) => {
    navigation.navigate("Content",{
      "emailId":id,
      "emailDomain": emailDomain,
      "emailName": emailName
    })
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.emailMainView} onPress={() => onPressProps(item.id)}>
      <View style={styles.viewBackground}>
        <View style={styles.dotView}>
          <Entypo name="dot-single" size={30} color={item.color}/>
              <Text 
              numberOfLines={1} 
              adjustsFontSizeToFit={true} 
              style={{fontSize:15,color:item.color}}> 
                {item.emailFrom}
              </Text>
            </View>
        <View style={{height:"50%",width:"90%"}}>
          <Text style={styles.emailSubjectText} numberOfLines={2} >{item.emailSubject}</Text>
          <Text style={styles.emailDateText} numberOfLines={1} adjustsFontSizeToFit={true}>{item.emailDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSeparator = () => (
    <View
      style={{
        height: 10,
      }}
    />
  );

  const listEmptyComponent = () =>{
    return(
      <SafeAreaView style={styles.container}>
          <View style={{...styles.flastlistView,justifyContent:"center",alignItems:"center"}}>
            <Image source={require('../assets/404.png')} resizeMode="contain" style={styles.image}/>
             <View style={styles.textContainer}>
               <Text style={styles.text}> No se han encontrado correos </Text>
             </View>
          </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1A1A1F" barStyle="light-content"/>
        <View style={styles.mainView}/>
          <View style={styles.flastlistView}>
              <FlatList
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={renderSeparator}
                bounces={true}  
                onRefresh={OnPressNew}
                refreshing={loading}
                keyExtractor={(item, index) => 'key'+index}
                ListEmptyComponent={listEmptyComponent}
              />
          </View>
      </SafeAreaView> 
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    height,
    width,
    backgroundColor:"#1A1A1F",
  },
  mainView:{
    height:"3%",
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
  flastlistView:{
    height:"97%",
    width:"100%"
  },
  emailMainView:{
    height:120,
    width:"100%",
    alignItems:"center"
  },
  viewBackground:{
    backgroundColor:"#222228",
    height:"100%",
    width:"93%",
    borderRadius:10
  },
  dotView:{
    flexDirection:"row",
    alignItems:"center",
    height:"40%",
    width:"100%"
  },
  emailSubjectText:{
    fontSize:13,
    color:"white",
    marginLeft:"8%"
  },
  emailDateText:{
    fontSize:13,
    color:"gray",
    marginLeft:"8%",
    marginTop:"4%"
  },
  image:{
    height:"50%",
    width:"90%"
  },
  textContainer:{
    height:"20%",
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
  text:{
    fontSize:16,
    color:"gray",
  }
})

export default EmailMainScreen
