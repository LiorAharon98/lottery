import { StyleSheet, Pressable, View, Text } from "react-native";
import React, { ReactNode } from "react";
import { GestureResponderEvent } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useDataProvider } from "../../context/Data";
import { StackActions } from "@react-navigation/native";
interface props {
  icon: string;
  to?: string;
  text: string;
  onPress?: (e?: GestureResponderEvent) => void;
  onToggleFooter: (e: string) => void;
  toggleFooter?: string;
}
const FooterTag = ({ icon, to, onPress, text, toggleFooter, onToggleFooter }: props) => {
  const { changeLanguage } = useDataProvider();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const pressHandler = () => {
    if (onPress) return onPress();
    onToggleFooter(text);

    if (to === "home") {
      const pushAction = StackActions.push(to);
      navigation.dispatch(pushAction);
      return;
    }
    navigation.navigate(to || "");
  };

  return (
    <Pressable onPress={pressHandler}>
      <View style={styles.container}>
        {text === "account" && (
          <Icon color={toggleFooter === text ? "rgb(21, 165, 241)" : "black"} name={icon} size={25} />
        )}
        {text === "lotterys" && (
          <Icon color={toggleFooter === text ? "rgb(21, 165, 241)" : "black"} name={icon} size={25} />
        )}
        {text === "home" && (
          <Icon color={toggleFooter === text ? "rgb(21, 165, 241)" : "black"} name={icon} size={25} />
        )}
        {text === "language" && (
          <Icon2 color={toggleFooter === text ? "rgb(21, 165, 241)" : "black"} name={icon} size={25} />
        )}
        <Text style={{ color: toggleFooter === text ? "rgb(21, 165, 241)" : "black" }}>{changeLanguage(text)}</Text>
      </View>
    </Pressable>
  );
};

export default FooterTag;

const styles = StyleSheet.create({
  container: {
    width: 70,
    alignItems: "center",
  },
});
