import { StyleSheet, ScrollView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../input/Input";
import React, { useState } from "react";
import Button from "../button/Button";
import { useDataProvider } from "../../context/Data";
import { Link } from "@react-navigation/native";

interface props {
  navigation: any;
  text: string;
  handleFunc: Function;
  error: string;
}
const SignCard = ({ navigation, text, handleFunc, error }: props) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { changeLanguage } = useDataProvider();
  const handlePress = async () => {
    if (!userName || !password) return alert("field cannot be empty");
    if (text === "sign up" && confirmPassword !== password) return alert("password not match");
    handleFunc(userName, password);
  };
  return (
    <ScrollView>
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["rgb(41, 185, 254)", "rgb(156, 220, 254)"]}
      >
        <Input onChange={setUserName} label={"username"} />
        <Input onChange={setPassword} label={"password"} />
        {text === "sign up" && <Input onChange={setConfirmPassword} label={"confirm password"} />}
        {error && <Text style={styles.error_text}>{changeLanguage(error)} !</Text>}
        <Button onPress={handlePress}>{text}</Button>

        <Link style={styles.transfer_link_container} to={text === "sign in" ? "/sign-up" : "/sign-in"}>
          <Text style={styles.transfer_link}>
            {text === "sign in" ? changeLanguage("dont have an account") : changeLanguage("already have an account")}?
          </Text>
        </Link>
      </LinearGradient>
    </ScrollView>
  );
};

export default SignCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 710,
    justifyContent: "space-around",
    backgroundColor: "rgb(0, 144, 239)",
  },
  transfer_link: {
    color: "white",
    textDecorationLine: "underline",
  },
  transfer_link_container: {
    padding: 10,
  },
  error_text: {
    color: "rgb(255, 19, 56)",
    fontSize: 22,
    textDecorationLine: "underline",
  },
});
