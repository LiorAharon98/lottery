import { StyleSheet, ScrollView,Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../input/Input";
import React, { useState } from "react";
import Button from "../button/Button";

interface props {
  navigation: any;
  text: string;
  handleFunc: Function;
  error : string
}
const SignCard = ({ navigation, text, handleFunc,error }: props) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handlePress = async () => {
    handleFunc(userName, password);
  };

  return (
    <ScrollView>
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["lightblue", "rgb(68, 138, 255)"]}
      >
        <Input  onChange={setUserName} label={"username"} />
        <Input onChange={setPassword} label={"password"} />
        {error && <Text>{error}</Text>}
        <Button onPress={handlePress}>{text}</Button>
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
});
