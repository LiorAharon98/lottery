import { Pressable, StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import UserProfileDetails from "../../components/user_profile_details/UserProfileDetails";
import { useDataProvider } from "../../context/Data";
import Button from "../../components/button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Index";
const UserSetting = ({ navigation }: any) => {
  const { localImageUpload, changeLanguage, changePassword } = useDataProvider();
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const { username, profilePicture } = user;
  const [inp, setInp] = useState<string>("");
  const handlePress = async () => {
    await localImageUpload(username);
  };
  const handleChangeNumbers = () => {
    navigation.navigate("create-user-lottery-numbers");
  };
  const handlePasswordChange = () => {
    changePassword(username, inp);
    setTogglePassword(false);
  };

  return (
    <ScrollView>
      <UserProfileDetails />
      <View style={styles.container}>
        <Pressable style={styles.text_container} onPress={handlePress}>
          <Text style={styles.text}>
            {profilePicture ? changeLanguage("change") : changeLanguage("Upload")} {changeLanguage("picture")}
          </Text>
          <Text style={styles.arrow}>{">"}</Text>
        </Pressable>

        <Pressable onPress={handleChangeNumbers} style={styles.text_container}>
          <Text style={styles.text}>{changeLanguage("Change numbers")}</Text>
          <Text style={styles.arrow}>{">"}</Text>
        </Pressable>

        {togglePassword ? (
          <View style={{ height: 70, width: "100%", alignItems: "center" }}>
            <TextInput onChangeText={setInp} style={{ width: 200, height: 25, borderBottomWidth: 1 }} />

            <Button onPress={handlePasswordChange}>change</Button>
          </View>
        ) : (
          <Pressable onPress={setTogglePassword.bind(this, true)} style={styles.text_container}>
            <Text style={styles.text}>{changeLanguage("Change password")}</Text>
            <Text style={styles.arrow}>{">"}</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    width: "90%",
  },
  text: {
    fontSize: 20,
  },
  arrow: {
    fontSize: 22,
  },
});
