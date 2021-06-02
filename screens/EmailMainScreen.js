import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  StatusBar,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const EmailMainScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailName, setEmailName] = useState(
    route.params.email[0].split("@")[0]
  );
  const [emailDomain, setEmailDomain] = useState(
    route.params.email[0].split("@")[1]
  );
  const [value, setValue] = useState(0);

  const render = useRef(0);

  const OnPressNew = () => {
    console.log("hola");
    fetch(
      `https://www.1secmail.com/api/v1/?action=getMessages&login=${emailName}&domain=${emailDomain}`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(".............");
        console.log(emailName);
        console.log(emailDomain);
        console.log(json);
        setLoading(true);
        setData(json);
        setValue(data.length);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    //first render
    OnPressNew();
    if (render.current !== 0) return;
  }, [render.current]);

  useEffect(() => {
    // prevent first render data
    if (render.current === 0) return;
  }, [data]);

  const onPressProps = (id) => {
    navigation.navigate("Content", {
      emailId: id,
      emailDomain: emailDomain,
      emailName: emailName,
    });
  };

  const RenderItem = ({ item }) => {
    {
      console.log(route.params.color);
    }
    return (
      <TouchableOpacity
        style={styles.emailMainView}
        onPress={() => onPressProps(item.item.id)}
      >
        <View style={styles.viewBackground}>
          <View style={styles.dotView}>
            <Entypo name="dot-single" size={30} color={route.params.color} />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{ fontSize: 15, color: route.params.color }}
            >
              {item.item.from}
            </Text>
          </View>
          <View style={{ height: "50%", width: "90%" }}>
            <Text style={styles.emailSubjectText} numberOfLines={2}>
              {item.item.subject}
            </Text>
            <Text
              style={styles.emailDateText}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
            >
              {item.item.date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => (
    <View
      style={{
        height: 10,
      }}
    />
  );

  const listEmptyComponent = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            ...styles.flastlistView,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/404.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}> No se han encontrado correos </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1A1A1F" barStyle="light-content" />
      <View style={styles.mainView} />
      <View style={styles.flastlistView}>
        <FlatList
          data={data}
          renderItem={(item) => <RenderItem item={item} />}
          ItemSeparatorComponent={renderSeparator}
          bounces={true}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => OnPressNew()}
            />
          }
          keyExtractor={(item, index) => "key" + index}
          ListEmptyComponent={listEmptyComponent}
        />
      </View>
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
  mainView: {
    height: "3%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  flastlistView: {
    height: "97%",
    width: "100%",
  },
  emailMainView: {
    height: 120,
    width: "100%",
    alignItems: "center",
  },
  viewBackground: {
    backgroundColor: "#222228",
    height: "100%",
    width: "93%",
    borderRadius: 10,
  },
  dotView: {
    flexDirection: "row",
    alignItems: "center",
    height: "40%",
    width: "100%",
  },
  emailSubjectText: {
    fontSize: 13,
    color: "white",
    marginLeft: "8%",
  },
  emailDateText: {
    fontSize: 13,
    color: "gray",
    marginLeft: "8%",
    marginTop: "4%",
  },
  image: {
    height: "50%",
    width: "90%",
  },
  textContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
});

export default EmailMainScreen;
