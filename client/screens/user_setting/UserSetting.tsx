import { Pressable, StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import { useDataProvider } from "../../context/Data";
import Button from "../../components/button/Button";
const UserSetting = ({ navigation }: any) => {
  const { localImageUpload, user, changeLanguage, changePassword } = useDataProvider();
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [inp, setInp] = useState<string>("");
  const handlePress = async () => {
    await localImageUpload();
  };
  const handleChangeNumbers = () => {
    navigation.navigate("create-user-lottery-numbers");
  };
  const handlePasswordChange = () => {
    changePassword(user.username, inp);
  };
  return (
    <ScrollView>
      <UserProfileDetails />
      <View style={styles.container}>
        <Pressable style={styles.text_container} onPress={handlePress}>
          <Text style={styles.text}>
            {user.profilePicture ? changeLanguage("change") : changeLanguage("upload")} {changeLanguage("picture")}
          </Text>
        </Pressable>

        <Pressable onPress={handleChangeNumbers} style={styles.text_container}>
          <Text style={styles.text}>{changeLanguage("change numbers")}</Text>
        </Pressable>

        {togglePassword ? (
          <View style={{ height: 70, width: "100%", alignItems: "center" }}>
            <TextInput onChangeText={setInp} style={{ width: 200, height: 25, borderBottomWidth: 1 }} />
            <Button onPress={handlePasswordChange}>change</Button>
          </View>
        ) : (
          <Pressable onPress={setTogglePassword.bind(this, true)} style={styles.text_container}>
            <Text style={styles.text}>{changeLanguage("change password")}</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
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
