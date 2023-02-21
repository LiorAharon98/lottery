import { StyleSheet, Pressable, View } from "react-native";
import React, { ReactNode } from "react";
import { GestureResponderEvent } from "react-native-modal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
interface props {
  icon: ReactNode;
  to?: string;
  onPress?: (e?: GestureResponderEvent) => void;
}
const FooterTag = ({ icon, to, onPress }: props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const pressHandler = () => {
    if (onPress) onPress();
    if (to) {
      navigation.navigate(to);
    }
  };

  return (
    <Pressable onPress={pressHandler}>
      <View style={styles.container}>{icon}</View>
    </Pressable>
  );
};

export default FooterTag;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    width: 60,
  },
});
