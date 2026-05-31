import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import Card from "../../components/card/Card";
import { useDataProvider } from "../../context/Data";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
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
      return (navigation.navigate("home"), logOut());
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
          <UserOptionIcon
            backgroundColor="rgb(0, 85, 241)"
            onPress={handlePress.bind(this, "setting-page")}
            text="Setting"
          >
            <Feather name="settings" size={30} color="white" />
          </UserOptionIcon>
          <UserOptionIcon backgroundColor="rgb(0, 204, 0)" onPress={handlePressLottery} text="Lottery">
            <FontAwesome name="dollar" size={30} color="white" />
          </UserOptionIcon>
        </View>
        <View style={styles.row_container}>
          <UserOptionIcon backgroundColor="rgb(255, 79, 16)" onPress={handlePress.bind(this, "odds-page")} text="Odds">
            <AntDesign name="question" size={30} color="white" />
          </UserOptionIcon>
          <UserOptionIcon
            backgroundColor="rgb(102, 206, 254)"
            onPress={handlePress.bind(this, "bank-page")}
            text="Bank"
          >
            <FontAwesome name="bank" size={30} color="white" />
          </UserOptionIcon>
        </View>
        <View style={styles.row_container}>
          <ModalNextLotteryTimeStamp />
          <UserOptionIcon
            backgroundColor="rgb(206, 145, 120)"
            onPress={handlePress.bind(this, "log out")}
            text="Log out"
          >
            <Entypo name="log-out" size={30} color="white" />
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
