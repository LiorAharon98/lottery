import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import { useDataProvider } from "../../context/Data";
const UserSetting = () => {
  const [image,setImage] = useState()
  const {localImageUpload,user} = useDataProvider()
  return (
    <>
      <UserProfileDetails />
      <View style={styles.container}>
        <View style={styles.text_container}>
          <Pressable onPress={localImageUpload}>

          <Text style={styles.text}>{user.imgProfile ? 'change' : 'upload'} picture</Text>
          </Pressable>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text}>change numbers</Text>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text}>change password</Text>
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
    borderWidth: 1,
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
