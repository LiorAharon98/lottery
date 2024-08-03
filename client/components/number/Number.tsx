import { StyleSheet, View } from "react-native";
import React, { ReactNode } from "react";
import * as Animatable from "react-native-animatable";
interface props {
  children: ReactNode;
  isSpecial: boolean;
}
const Number = ({ children, isSpecial }: props) => {
  return (
    <View style={[styles.container, { backgroundColor: isSpecial ? "rgb(255, 79, 16)" : "rgb(55, 103, 255)" }]}>
      <Animatable.Text style={styles.number} duration={500} delay={500} animation={"slideInDown"}>
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
    height: 43,
    width: 43,
    borderRadius: 20,
  },
  number: {
    color: "white",
    fontSize: 23,
  },
});
