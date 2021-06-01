import React, { useEffect, useRef, useState } from "react";
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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "@react-native-clipboard/clipboard";
import { AntDesign } from "@expo/vector-icons";
import SwipeableFlatList from "react-native-swipeable-list";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const EmailScreen = ({ navigation }) => {
  const [data, setData] = useState({
    loading: true,
    email: '',
    value: 0,
    verticalVal: new Animated.Value(0)
  })
  const [ info, setInfo ] = useState([])
  const preventCharge = useRef(0)
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

  const onPressNew = () => {
    fetch("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
      .then((response) => response.json())
      .then(json => {
        setData({...data, email: json[0], loading: true})
        console.log()
        listformating()
        preventCharge.current = preventCharge.current + 1
      })
      .catch((error) => console.error(error));
  };

  const listformating = () => {
    const test = {
      "email": data.email,
      "time": moment().add(15, "m"),
      "color": colors[getRndInteger(0, 6)],
    };
    setData({...data, loading: false, value: info.length})
    setInfo({test})
    setObjectValue();
    getMyObject();
  };

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const onLongPressEmail = (mail) => {
    Clipboard.setString(mail);
    ToastAndroid.show(`Email copiado ${ToastAndroid.LONG}`);
  };

  const onPressProps = (email, endTime) => {
    const currentTime = moment();
    if (moment(endTime).isAfter(currentTime)) {
      navigation.navigate('EmailNow', {"email": email})
    } else {
      refRBSheet.open();
    }
  };

  const deleteItemById = (email) => () => {
    const filteredData = info.filter((item) => item.email !== email);
    console.log(`filt ${filteredData}`)
    setInfo({filteredData})
    try {
      const json = JSON.stringify(filteredData);
      AsyncStorage.setItem("Emails", json);
      getMyObject();
      setData({...data, value: info.length })
    } catch (error) {
      console.error(error);
    }
  };

  const setObjectValue = async () => {
    try {
      const json = JSON.stringify(data.data);
      await AsyncStorage.setItem("Emails", json);
      setData({...data, value: info.length })
    } catch (error) {
      console.error(error);
    }
  };

  const getMyObject = async () => {
    try {
      const json = await AsyncStorage.getItem("Emails");
      if (json) {
        const datajson = JSON.parse(json);
        setInfo({datajson})
        setData({...data , email: json[0], loading: true, value: info.length })
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(preventCharge.current)
    if(preventCharge.current === 0) return;
    console.log(data)
    console.log(info)
    getMyObject();
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
  }, [preventCharge.current]);

  const renderItem = ({ item }) => {
    <TouchableOpacity
      style={styles.emailTouch}
      onPress={() => onPressProps(item.email, item.time)}
      onLongPress={() => onLongPressEmail(item.email)}
    >
      <View style={styles.emailMainView}>
        <View
          style={{
            height: "100%",
            width: "3%",
            backgroundColor: item.color,
            borderRadius: 45,
          }}
        />
        <View style={styles.emailContainer}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={styles.emailText}
          >
            {item.email}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={styles.timestampText}
          >
            {moment(item.time).format("dddd, MMMM Do YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>;
  };

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
              onPress={onPressNew}
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
            renderItem={renderItem}
            renderRight={({ item }) => (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={deleteItemById(item.email)}
              >
                <Icon name="close" size={24} color="#FFF" />
              </TouchableOpacity>
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
    height: "20%",
    width: "75%",
    backgroundColor: "#657EE4",
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
    alignItems: "center",
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
