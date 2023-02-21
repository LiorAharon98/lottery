import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import FooterTag from "../footer_tag/FooterTag";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Entypo";


import { useDataProvider } from "../../context/Data";
import LanguageChange from "../language_change/LanguageChange";

const Footer = () => {
  const { user } = useDataProvider();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.text_container}>
          <FooterTag to={user ? "user-page" : "sign-in"} icon={<Icon name="account" size={25} />} />
          <FooterTag to="latest-lottery" icon={<Icons name="info" size={25} />} />
          <LanguageChange />
          <FooterTag to="home" icon={<Icons name="home" size={25} />} />
        </View>
      </View>
    </>
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
