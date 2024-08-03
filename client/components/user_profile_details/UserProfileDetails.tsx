import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useDataProvider } from "../../context/Data";
import { useSelector } from "react-redux";
const UserProfileDetails = () => {
  const {changeLanguage } = useDataProvider();
  const user = useSelector<any>(state=>state.user)
  const userInfo = [
    { label: "member since", info: user.memberSince },
    { label: "you earn", info: `${user.earned}₪` },
    { label: "latest win", info: `${user.latestWin.number}₪` },
  ];
  return (
    <LinearGradient colors={["rgb(55, 103, 255)", "rgb(55, 103, 255)"]} style={styles.header_container}>
      <View style={styles.user_picture_container}>
        <Text style={[styles.text, { fontSize: 24 }]}>
          {changeLanguage("hello")} {user.username}
        </Text>
        {user.profilePicture && <Image style={styles.image} source={{ uri: user.profilePicture }}></Image>}
      </View>
      <View style={styles.user_info_container}>
        {userInfo.map((currentInfo, index) => (
          <View key={index} style={styles.user_info}>
            <Text style={styles.text}>{changeLanguage(currentInfo.label)}</Text>
            <Text style={styles.text}>{currentInfo.info}</Text>
          </View>
        ))}
      </View>
      {!user.lotteryNumbers && (
        <Text style={{ textAlign: "center", color: "red", fontSize: 19 }}>
          {changeLanguage('you didnt choose numbers for best experience please press on lottery')}
        </Text>
      )}
    </LinearGradient>
  );
};

export default UserProfileDetails;

const styles = StyleSheet.create({
  header_container: {
    justifyContent: "space-around",
    height: 240,
    width: "100%",
    borderTopRightRadius :0,
    borderTopLeftRadius :0,
    borderRadius: 5,
  },
  user_info_container: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  user_info: {
    flexDirection: "column",
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    color: "white",
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 10,
  },
  user_picture_container: {
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
