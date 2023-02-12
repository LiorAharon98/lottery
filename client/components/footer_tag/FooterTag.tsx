import { StyleSheet, Pressable, View } from "react-native";
import { Link } from "@react-navigation/native";
import React, { ReactNode } from "react";
import { GestureResponderEvent } from "react-native-modal";
interface props {
  tag: ReactNode;
  to : any
}
const FooterTag = ({ tag,to }: props) => {
  return (
    <>
    <Link to={to}>
     <View>{tag}</View>
    </Link>
    </>
  );
};

export default FooterTag;

const styles = StyleSheet.create({});
