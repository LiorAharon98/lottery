import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../../components/card/Card";
import { useDataProvider } from "../../context/Data";
import SquareBox from "../../components/square_box/SquareBox";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
const UserPage = () => {
  const { logOut } = useDataProvider();

  return (
    <View>
      <Card>
        <UserProfileDetails />
        <View style={styles.container_box}>
          <View style={styles.container_box2}>
            <SquareBox to={"/setting-page"}>setting</SquareBox>
            <SquareBox to={"/lottery-page"}>lottery</SquareBox>
          </View>
          <View style={styles.container_box2}>
            <SquareBox to={"/info-page"}>info</SquareBox>
            <SquareBox onPress={logOut} to={"/home"}>
              log out
            </SquareBox>
          </View>
        </View>
        <View></View>
      </Card>
    </View>
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
