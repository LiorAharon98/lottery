import { StyleSheet, View } from "react-native";
import React, { ReactNode } from "react";
import * as Animatable from "react-native-animatable";
interface props {
  children: ReactNode;
  isSpecial: boolean;
}
const Number = ({ children, isSpecial }: props) => {
  return (
    <View style={[styles.container, { backgroundColor: isSpecial ? "rgb(255, 59, 59)" : "rgb(21, 165, 241)" }]}>
      <Animatable.Text style={styles.number} animation={"slideInDown"}>
        {children}
      </Animatable.Text>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 41,
    width: 41,
    borderRadius: 20,
  },
  number: {
    color: "white",
    fontSize: 23,
  },
});
