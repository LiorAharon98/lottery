import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../../components/card/Card";
import { useDataProvider } from "../../context/Data";
import SquareBox from "../../components/square_box/SquareBox";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
const UserPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { logOut, changeLanguage } = useDataProvider();
  const handlePressLogOut = () => {
    navigation.navigate("home");
    logOut();
  };

  return (
      <Card>
        <UserProfileDetails />
        <View style={styles.container_box}>
          <View style={styles.container_box2}>
            <SquareBox to={"/setting-page"}>{changeLanguage("setting")}</SquareBox>
            <SquareBox to={"/lottery-page"}>{changeLanguage("lottery")}</SquareBox>
          </View>
          <View style={styles.container_box2}>
            <SquareBox to={"/odds-page"}>{changeLanguage("odds")}</SquareBox>
            <SquareBox onPress={handlePressLogOut}>{changeLanguage("log out")}</SquareBox>
          </View>
        </View>
        <View></View>
      </Card>
  );
};

export default UserPage;

const styles = StyleSheet.create({
  container_box: {
    height: 300,
    width: "80%",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  container_box2: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
