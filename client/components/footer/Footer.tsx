import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FooterTag from "../footer_tag/FooterTag";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Entypo";
import Icons2 from "react-native-vector-icons/Entypo";
import { useDataProvider } from "../../context/Data";

const Footer = () => {
 const {user} = useDataProvider()
  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <FooterTag  to= {{screen : Object.keys(user).length>0 ? "user-page" : 'sign-in' } } tag={<Icon name="account" size={25} />} />
        <FooterTag to="/home" tag={<Icons name="info" size={25} />} />
        <FooterTag to="/home" tag={<Icon name="account" size={25} />} />
        <FooterTag to="/home" tag={<Icons2 name="home" size={25} />} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  text_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
export default Footer;
