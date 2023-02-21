import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ButtonHomepage from "../../components/button_homepage/ButtonHomepage";
import { LinearGradient } from "expo-linear-gradient";
import SquareBox from "../../components/square_box/SquareBox";
import { Picker } from "@react-native-picker/picker";
import Timestamp from "../../components/timestamp/Timestamp";
import { useDataProvider } from "../../context/Data";
const Homepage = ({ navigation }: any) => {
  const { user, changeLanguage } = useDataProvider();
  const handlePress = (e: string) => {
    if (e === "sign-in" && user) return navigation.navigate("user-page");
    navigation.navigate(e);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["lightblue", "rgb(68, 138, 255)"]}
      ></LinearGradient>
      <View style={styles.button_container}>
        <ButtonHomepage onPress={handlePress.bind(this, "sign-in")}>{user ? "personal" : "sign in"}</ButtonHomepage>
        <ButtonHomepage onPress={handlePress.bind(this, "sign-up")}>sign up</ButtonHomepage>
      </View>

      <View style={styles.square_box_container}>
        <View style={styles.square_box_container2}>
          <SquareBox to="/home">{changeLanguage("info")}</SquareBox>
          <SquareBox to="/latest-lottery">{changeLanguage("latest")}</SquareBox>
        </View>
        <View style={styles.square_box_container2}>
          <SquareBox to="/home">{changeLanguage("news")}</SquareBox>
          <SquareBox to="/about-page">{changeLanguage("about")}</SquareBox>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 600,
    justifyContent: "space-between",
  },
  header: {
    height: 150,
  },
  button_container: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  square_box_container2: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  square_box_container: {
    height: 300,
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
export default Homepage;
