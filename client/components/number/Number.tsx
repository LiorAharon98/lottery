import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
interface props {
  children: ReactNode;
  isSpecial : boolean
}
const Number = ({ children,isSpecial }: props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.number,{ backgroundColor : isSpecial ? 'rgb(255, 59, 59)' : 'rgb(21, 165, 241)'}]}>{children}</Text>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  container: {},
  number: {
    width : 35,
    height : 30,
    textAlign : 'center',
    color : 'white',
    fontSize: 20,
    borderRadius : 20
  },
});
