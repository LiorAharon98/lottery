import { StyleSheet, Text, View, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import React from "react";

interface props {
  label: string;
  onChange: (text: string) => void;
}
const Input = ({ label, onChange }: props) => {
  return (
    <View style={styles.input_container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput onChangeText={onChange} style={styles.input} />

    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input_container:{
height :100,
justifyContent : 'space-between'

  },
  input: {
    flexDirection: "row",
    borderBottomWidth : 3,
    borderBottomColor : 'white',
    marginTop: 10,
    width: 200,
    height: 40,
    paddingLeft : 5,
    fontSize : 20,
    color : 'white'
  },
  label:{
    color : 'white',
    fontSize : 19
  }

});
