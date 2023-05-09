import { View, StyleSheet, Text } from "react-native";
import { useEffect, useCallback, useState } from "react";
import ButtonHomepage from "../../components/button_homepage/ButtonHomepage";
import { LinearGradient } from "expo-linear-gradient";
import SquareBox from "../../components/square_box/SquareBox";
import { useDataProvider } from "../../context/Data";
import * as Animatable from "react-native-animatable";
import UserOptionIcon from "../../components/user_option_icon/UserOptionIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/AntDesign";
const Homepage = ({ navigation }: any) => {
  const { user, changeLanguage, getItemFromStorage } = useDataProvider();
  const handlePress = (e: string) => {
    if (e === "sign-in" && user) return navigation.push("user-page");
    navigation.navigate(e);
  };

  useEffect(() => {
    getItemFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["rgb(41, 185, 254)", "rgb(156, 220, 254)"]}
      ></LinearGradient>

      <View style={styles.button_container}>
        <View style={styles.button_container2}>
          <Animatable.View animation={"slideInDown"}>
            <UserOptionIcon onPress={handlePress.bind(this, "sign-in")} text={user ? "personal" : "sign in"}>
              <Icon name="account" size={35} />
            </UserOptionIcon>
          </Animatable.View>
          {!user && (
            <>
              <Text style={{ textAlign: "center", fontSize: 20 }}>{changeLanguage("or")}</Text>
              <Animatable.View animation={"slideInDown"}>
                <UserOptionIcon onPress={handlePress.bind(this, "sign-up")} text={"sign up"}>
                  <Icon name="account" size={35} />
                </UserOptionIcon>
              </Animatable.View>
            </>
          )}
        </View>
      </View>
      <View style={styles.square_box_container}>
        <Animatable.View animation={"slideInLeft"}>
          <UserOptionIcon height={70} width={85}  onPress={handlePress.bind(this, "latest-lottery")} text={"lotterys"}>
            <Icon2 name="history" size={35} />
          </UserOptionIcon>
        </Animatable.View>
        <Animatable.View animation={"slideInRight"}>
          <UserOptionIcon height={70} width={85} onPress={handlePress.bind(this, "about-page")} text={"about"}>
            <Icon3 name="info" size={35} />
          </UserOptionIcon>
        </Animatable.View>
      </View>

      <View></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    height: 150,
  },
  button_container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  button_container2: {
    justifyContent: "space-around",
    height: 300,
  },
  square_box_container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue",
  },
});
export default Homepage;
