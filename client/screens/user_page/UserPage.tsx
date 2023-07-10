import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import Card from "../../components/card/Card";
import { useDataProvider } from "../../context/Data";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/FontAwesome";
import UserOptionIcon from "../../components/user_option_icon/UserOptionIcon";
import ModalNextLotteryTimeStamp from "../../components/modal_next_lottery_time_stamp/ModalNextLotteryTimeStamp";
import { useSelector } from "react-redux";
const UserPage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const user = useSelector<any>((state) => state.user);
  const { logOut, setItemFromStorage } = useDataProvider();
  const handlePressLottery = () => {
    if (!user.lotteryNumbers) navigation.navigate("create-user-lottery-numbers");
    else navigation.navigate("lottery-page");
  };
  const handlePress = (value: string) => {
    if (value === "log out") {
      navigation.canGoBack();
      return navigation.navigate("home"), logOut();
    }
    navigation.navigate(value);
  };
  useEffect(() => {
    setItemFromStorage(user);
  }, [user]);
  return (
    <Card height={true}>
      <UserProfileDetails />
      <Animatable.View style={styles.container_box} delay={500} animation={"slideInUp"}>
        <View style={styles.row_container}>
          <UserOptionIcon onPress={handlePress.bind(this, "setting-page")} text="setting">
            <Icon2 size={35} name="setting" />
          </UserOptionIcon>
          <UserOptionIcon onPress={handlePressLottery} text="lottery">
            <Icon4 size={35} name="attach-money" />
          </UserOptionIcon>
        </View>
        <View style={styles.row_container}>
          <UserOptionIcon onPress={handlePress.bind(this, "odds-page")} text="odds">
            <Icon2 size={35} name="question" />
          </UserOptionIcon>
          <UserOptionIcon onPress={handlePress.bind(this, "bank-page")} text="bank">
            <Icon5 size={35} name="bank" />
          </UserOptionIcon>
        </View>
        <View style={styles.row_container}>
          <ModalNextLotteryTimeStamp />
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
    width: "90%",
  },
  row_container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
