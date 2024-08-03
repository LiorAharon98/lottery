import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useDataProvider } from "../../context/Data";
import Icon from "react-native-vector-icons/MaterialIcons";
import { inputProps } from "../../types/type";
const Input = ({ label, onChange, color }: inputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { changeLanguage } = useDataProvider();
  const pressHandler = () => {
    setIsVisible(!isVisible);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: color ? color : "black" }]}>{changeLanguage(label)}</Text>

      <View style={styles.input_container}>
        <TextInput style={styles.input} secureTextEntry={label !== "username" && !isVisible} onChangeText={onChange} />
        {label !== "username" &&
          (isVisible ? (
            <Icon onPress={pressHandler} style={styles.visible_icon} name="visibility-off" />
          ) : (
            <Icon onPress={pressHandler} style={styles.visible_icon} name="visibility" />
          ))}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "space-between",
  },
  input: {
    width: "90%",

    fontSize: 20,
  },
  input_container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    width: 220,
    height: 50,
  },
  label: {
    fontSize: 17,
  },

  visible_icon: {
    fontSize: 18,
    padding: 9,
  },
});
