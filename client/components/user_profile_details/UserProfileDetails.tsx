import { StyleSheet, Text, View,Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useDataProvider } from "../../context/Data";

const UserProfileDetails = () => {
  const { user } = useDataProvider();
  return (
    <LinearGradient colors={["rgb(40, 146, 255)", "rgb(109, 181, 255)"]} style={styles.header_container}>
      <Text style={styles.user_name}>hello {user.username}</Text>
     {user.imgProfile &&  <Image source={{uri :'dsadas' }}></Image>}
      <View style={styles.user_info_container}>
        <View style={styles.user_info}>
          <Text style={styles.text}>member since </Text>
          <Text style={styles.text}>{user.memberSince}</Text>
        </View>
        <View style={styles.user_info}>
          <Text style={styles.text}>your earn </Text>
          <Text style={styles.text}>{user.earned}₪</Text>
        </View>
        <View style={styles.user_info}>
          <Text style={styles.text}>your earn {user.income}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default UserProfileDetails;

const styles = StyleSheet.create({
  header_container: {
    justifyContent: "space-around",
    height: 300,
    width: "100%",
    borderRadius: 10,
  },
  user_info_container: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  user_info: {
    flexDirection: "column",
    alignItems: "center",
  },
  user_name: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});
