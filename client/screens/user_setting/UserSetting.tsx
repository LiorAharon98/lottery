import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import { useDataProvider } from "../../context/Data";
const UserSetting = () => {
  const {localImageUpload,user,changeLanguage} = useDataProvider()
  const handlePress =async()=>{
    await localImageUpload()
  }
  return (
    <>
      <UserProfileDetails />
      <View style={styles.container}>
        <View style={styles.text_container}>
          <Pressable onPress={handlePress}>

          <Text style={styles.text}>{user.profilePicture ? changeLanguage('change') : changeLanguage('upload')} {changeLanguage('picture')}</Text>
          </Pressable>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text}>{changeLanguage('change numbers')}</Text>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text}>{changeLanguage('change password')}</Text>
        </View>
      </View>
    </>
  );
};

export default UserSetting;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    justifyContent: "space-around",
    height: 400,
    width: "100%",
  },
  text_container: {
    height: 40,
    width: "80%",
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
  },
});
