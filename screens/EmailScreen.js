import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
  ToastAndroid,
  Modal,
  TouchableHighlight,
  Animated,
  Easing,
  StatusBar,
  FlatList,
  LayoutAnimation
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from 'expo-clipboard';
import { AntDesign } from "@expo/vector-icons";
// import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
// import SwipeableFlatList from 'react-native-swipeable-flat-list-2'
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";
import 'moment/locale/es'
import {
  SwipeableFlatList,
  SwipeableQuickActionButton,
  SwipeableQuickActions,
} from 'react-native-swipe-list';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const EmailScreen = ({ navigation, route }) => {

  const [data, setData] = useState({
    loading: true,
    email: '',
    value: 0,
    verticalVal: new Animated.Value(0)
  });

  const [ info, setInfo ] = useState([])

  const preventCharge = useRef(0)

  const render = useRef(0)
  
  // const [loading, setLoading] = useState(true);
  // const [email, setEmail] = useState();
  // const [data, setData] = useState([]);
  // const [value, setValue] = useState(0);
  // const [modalVisible, setModalVisible] = useState(true);
  // const [copyEmail, setCopyEmail] = useState("");
  // const [verticalVal, setVerticalVal] = useState(new Animated.Value(0));

  const refRBSheet = useRef();

  const colors = [
    "#00B0FF",
    "#00BFA6",
    "#F50057",
    "#536DFE",
    "#F9A826",
    "#F9A826",
  ];

  const onLongPressEmail = (mail) => {
    Clipboard.setString(mail[0]);
    ToastAndroid.show('Email copiado',ToastAndroid.LONG);
    console.log(mail)
  };

  // se ejecuta una sola vez al renderizar el componente
  useEffect(() => {
    console.log('first render')
    const getMyFirstObject = async () => {
      console.log('run function in first render')
      try {
        const json = await AsyncStorage.getItem("Emails");
        // if (json) {
          console.log('run if json')
          const datajson = JSON.parse(json);
          console.log('datajson')
          console.log(datajson)
          setInfo(datajson)
          setData({...data , email: json[0], loading: true, value: info.length })
          
        // } 
      } catch (error) {
        console.error(error);
      }
    };
    getMyFirstObject();
    
    Animated.timing(data.verticalVal, {
      toValue: 10,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.quad),
    }).start();
    data.verticalVal.addListener(({ value }) => {
      if (value === 10) {
        Animated.timing(data.verticalVal, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }).start();
      } else {
        Animated.timing(data.verticalVal, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }).start();
      } 
    });
    return () => {
      console.log("clean");
    };
  }, []);

  useEffect(() => {
    console.log('fuck this shit data')
    console.log(data)
    console.log('fuck this info')
    console.log(info)
    setData({...data, loading: false, value: info.length })
  },[info])

  const getMyObject = async () => {
    console.log('run function in first render')
    try {
      const json = await AsyncStorage.getItem("Emails");
      // if (json) {
        console.log('run if json')
        const datajson = JSON.parse(json);
        console.log('datajson')
        console.log(datajson)
        setInfo(datajson)
        setData({...data , email: json[0], loading: true, value: info.length })
      // } 
    } catch (error) {
      console.error(error);
    }
  };

  const onPressNew = async () => {
    const url = 'https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1'
    const api = await fetch(url);
    const mail = await api.json();
    console.log(`desde la api: ${mail[0]}`)
    setData({ ...data, loading: true, email: mail[0] });
    const list = {
      "email": mail,
      "time": moment().add(15, "m"),
      "color": colors[getRndInteger(0, 6)],
    };
    setInfo([list, ...info])
    setData({...data, loading: false, value: info.length })
    // console.log('finish 1')

    render.current = render.current + 1
    // setObjectValue();
    // getMyObject();    
  };

  useEffect(() => {
    if(preventCharge.current === 0) return;
    // console.log('data in data effect')
    // console.log(data)
    // console.log('info in data effect')
    // console.log(info)
  }, [data, info])

  useEffect(() => {
    if(preventCharge.current === 0) return;
    setObjectValue();
    getMyObject();
  }, [render.current])



  const updateState = () => {
    if(data.value < 4) {
      preventCharge.current = preventCharge.current + 1
      console.log(`prevent ${preventCharge.current}`)
      onPressNew()
    } else {
      console.log('No puedes tener muchos correos simultaneos')
      ToastAndroid.show('No puedes tener muchos correos simultaneos',ToastAndroid.SHORT);
    }
  }

  // const onPressNew = async () => {
  //   const url = 'https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1'
  //   const api = await fetch(url);
  //   const mail = await api.json();
  //   console.log(`desde la api: ${mail[0]}`)
  //   setData({ ...data, loading: true, email: mail[0] });
  //   const list = {
  //     "email": mail,
  //     "time": moment().add(15, "m"),
  //     "color": colors[getRndInteger(0, 6)],
  //   };
  //   setInfo([...info, list ])
  //   setData({...data, loading: false, value: info.length })
  //   console.log('finish 1')
  //   render.current = render.current + 1
  //   setObjectValue();
  //   getMyObject();
  // };

  // useEffect(() => {
  //   if(preventCharge.current === 0){
  //     console.log('no se ejecuto la primera vez')
  //     return;
  //   } else {
  //     onPressNew()
  //     console.log('data from useEffect')
  //     console.log(data)
  //     console.log('list from useEffect')
  //     console.log(info)
  //   }
  // }, [preventCharge.current])

  // useEffect(() => {
  //   console.log('data from data effect')
  //   console.log(data)
  //   console.log(`info from data effect`)
  //   console.log(info)
  // }, [data])

  // useEffect(() => {
  //   if(render.current === 0) return;
    
  // }, [render.current])
  
  // useEffect(() => {
  //   if(render.current === 0){
  //     console.log('no se ejecuto la primera vez')
  //     return;
  //   } else {
  //     setObjectValue();
  //     getMyObject();
  //     console.log('data from render effect')
  //     console.log(data)
  //     console.log(`info from render effect`)
  //     console.log(info)
      
  //   }
  // }, [render.current])
  

  // const listformating = () => {
    
  // };


  const setObjectValue = async () => {
    try {
      const json = JSON.stringify(info);
      // console.log(`json`)
      // console.log(json)
      await AsyncStorage.setItem("Emails", json);
      setData({...data, value: info.length })
    } catch (error) {
      console.error(error);
    }
  };

  // const getMyObject = async () => {
  //   try {
  //     const json = await AsyncStorage.getItem("Emails");
  //     if (json) {
  //       const datajson = JSON.parse(json);
  //       setInfo(datajson)
  //       setData({...data , email: json[0], loading: true, value: info.length })
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // const onLongPressEmail = (mail) => {
  //   Clipboard.setString(mail);
  //   ToastAndroid.show(`Email copiado ${ToastAndroid.LONG}`);
  // };

  const onPressProps = (email, endTime, color) => {
    const currentTime = moment();
    if (moment(endTime).isAfter(currentTime)) {
      navigation.navigate('EmailNow', {"email": email, "color": color})
    } else {
      refRBSheet.current.open();
    }
  };

  const deleteItemById = (email) => {
    const filteredData = info.filter(item => item.email !== email);
    // console.log(`filt`)
    // console.log(filteredData)
    setInfo(filteredData)
    try {
      const json = JSON.stringify(filteredData);
      AsyncStorage.setItem("Emails", json);
      getMyObject();
      setData({...data, value: info.length })
    } catch (error) {
      console.error(error);
    }    
  };

  

  const RenderItem = ({ item }) => {
    // console.log('from render item')
    // console.log(item)
    moment.locale('es')
    const dateFormat = moment(item.item.time).format('LLL')
    return (
      <>
      
      <TouchableOpacity
        style={styles.emailTouch}
        onPress={() => onPressProps(item.item.email, item.item.time, item.item.color)}
        onLongPress={() => onLongPressEmail(item.item.email)}
      >
        <View style={styles.emailMainView}>
          <View
            style={{
              height: "100%",
              width: "3%",
              backgroundColor: item.item.color,
              borderRadius: 45,
            }}
          />
          <View style={styles.emailContainer}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={styles.emailText}
            >
              {item.item.email}
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={styles.timestampText}
            >
              { dateFormat }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
        {/* <TouchableOpacity style={styles.deleteButton} onPress={deleteItemById(item.email)}>
        <AntDesign name="close" size={24} color="white"/>
      </TouchableOpacity> */}
      </>
    )
  };

  const RenderItemRigth = ({ item }) => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItemById(item.item.email)}>
        <AntDesign name="close" size={24} color={item.item.color}/>
      </TouchableOpacity>
    )
  }

  const renderSeparator = () => (
    <View
      style={{
        height: 10,
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1A1A1F" barStyle="light-content" />
      <RBSheet
        ref={refRBSheet}
        closeOnPressBack={true}
        animationType="fade"
        closeOnDragDown={true}
        openDuration={300}
        customStyles={{
          container: {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            height: "30%",
            backgroundColor: "#1A1A1F",
          },
        }}
      >
        <View style={styles.mainViewSwipe}>
          <Image
            resizeMode="contain"
            source={require('../assets/astronaut.png')}
            style={styles.mainImage}
          />
          <View style={styles.secondaryViewSwipe}>
            <Text style={styles.textHeader}>Oh no!</Text>
            <Text style={styles.subtitleStyle}>
            Lo sentimos, su correo electrónico ha caducado. Deslice la tarjeta para eliminar un correo electrónico. Cada correo electrónico es válido sólo durante 15 minutos
            </Text>
          </View>
        </View>
      </RBSheet>
      <View style={styles.mainEmail}>
        <View style={styles.emailBoxView}>
          <Animated.View
            style={{
              ...styles.imageView,
              transform: [{ translateY: data.verticalVal }],
            }}
          >
            <Image
              source={require('../assets/astronaut2.png')}
              resizeMode="contain"
              style={{ height: "100%", width: "100%" }}
            />
          </Animated.View>
          <View style={styles.newEmailTAB}>
            <Text style={styles.hiyouStyle}>Hola tú.</Text>
            <TouchableOpacity
              style={styles.newEmail}
              onPress={updateState}
            >
              <Text style={styles.newEmail_text}>Nuevo correo electrónico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {data.value != 0 ? (
        <View style={styles.listMainView}>
          <SwipeableFlatList
            data={info}
            renderItem={(item) => <RenderItem item={item}/> }
            // renderRight={(item) => <RenderItemRigth item={item}/> }
            renderRightActions={(item) => (
              <SwipeableQuickActions>
                <RenderItemRigth item={item} />
              </SwipeableQuickActions>
            )}
            backgroundColor={"#1A1A1F"}
            itemBackgroundColor={"#1A1A1F"}
            ItemSeparatorComponent={renderSeparator}
            bounces={true}
            refreshing={data.loading}
            keyExtractor={(item, index) => "key" + index}
          />
        </View>
      ) : (
        <View
          style={{
            ...styles.listMainView,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require('../assets/astronaut3.png')}
            resizeMode="contain"
            style={{ height: "30%", width: "100%" }}
          />
          <Text style={styles.introText}> No se han encontrado correos </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: "#1A1A1F",
  },
  mainEmail: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emailBoxView: {
    height: "75%",
    width: "90%",
    backgroundColor: "#222228",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  imageView: {
    height: "80%",
    width: "40%",
  },
  newEmailTAB: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  hiyouStyle: {
    fontSize: 18,
    color: "white",
    marginLeft: "10%",
  },
  newEmail: {
    height: "25%",
    width: "75%",
    backgroundColor: "#f50537",
    marginLeft: "10%",
    borderRadius: 10,
    marginTop: "8%",
    justifyContent: "center",
    alignItems: "center",
  },
  newEmail_text: {
    fontSize: 13,
    color: "#FFF",
    textAlign: 'center'
  },
  listMainView: {
    height: "70%",
    width: "100%",
    backgroundColor: "#1A1A1F",
  },
  deleteButton: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: 'center',
    // position: 'absolute'

  },
  emailTouch: {
    height: 90,
    width: "100%",
    alignItems: "center",
  },
  emailMainView: {
    backgroundColor: "#222228",
    height: "100%",
    width: "93%",
    flexDirection: "row",
    borderRadius: 10,
  },
  emailContainer: {
    height: "100%",
    width: "80%",
    justifyContent: "center",
    marginLeft: "10%",
  },
  emailText: {
    fontSize: 15,
    color: "#FFF",
  },
  timestampText: {
    fontSize: 13,
    color: "gray",
    marginTop: "5%",
  },
  introText: {
    fontSize: 15,
    color: "gray",
    marginTop: "15%",
  },
  mainViewSwipe: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  mainImage: {
    height: "50%",
    width: "30%",
  },
  textHeader: {
    color: "#F1F1F1",
    fontSize: 17,
    textAlign: "center",
  },
  subtitleStyle: {
    color: "gray",
    fontSize: 15,
    marginTop: "5%",
    textAlign: "center",
  },
  secondaryViewSwipe: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "50%",
  },
});

export default EmailScreen;
