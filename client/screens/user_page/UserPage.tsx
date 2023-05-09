import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../../components/card/Card";
import { useDataProvider } from "../../context/Data";
import SquareBox from "../../components/square_box/SquareBox";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/AntDesign";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import UserOptionIcon from "../../components/user_option_icon/UserOptionIcon";
const UserPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { logOut, user } = useDataProvider();
  const handlePressLottery = () => {
    if (!user.lotteryNumbers) navigation.navigate("create-user-lottery-numbers");
    else navigation.navigate("lottery-page");
  };
  const handlePress = (value: string) => {
    if (value === "log out") {
      navigation.popToTop()
      return navigation.navigate("home"), logOut();
    }
    navigation.navigate(value);
  };

  return (
    <Card height={true}>
      <UserProfileDetails />
      <Animatable.View style={styles.container_box} animation={"slideInUp"}>
        <View style={styles.container_box2}>
          <UserOptionIcon onPress={handlePress.bind(this, "setting-page")} text="setting">
            <Icon3 size={35} name="setting" />
          </UserOptionIcon>
          <UserOptionIcon onPress={handlePressLottery} text="lottery">
            <Icon4 size={35} name="attach-money" />
          </UserOptionIcon>
        </View>
        <View style={styles.container_box2}>
          <UserOptionIcon onPress={handlePress.bind(this, "odds-page")} text="odds">
            <Icon2 size={35} name="question" />
          </UserOptionIcon>
          <UserOptionIcon onPress={handlePress.bind(this, "log out")} text="log out">
            <Icon size={35} name="log-out" />
          </UserOptionIcon>
        </View>
      </Animatable.View>
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
