import { StyleSheet, Text, View, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import React, { useState } from "react";
import { useDataProvider } from "../../context/Data";
import Icon from "react-native-vector-icons/MaterialIcons";
interface props {
  label: string;
  onChange: (text: string) => void;
}
const Input = ({ label, onChange }: props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { changeLanguage } = useDataProvider();
  const pressHandler = () => {
    setIsVisible(!isVisible);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{changeLanguage(label)}</Text>

      <View style={styles.input_container}>
        <TextInput style={styles.input} secureTextEntry={isVisible} onChangeText={onChange} />
        {label !== "username" &&
          (isVisible ? (
            <Icon onPress={pressHandler} style={styles.visible_icon} name="visibility" />
          ) : (
            <Icon onPress={pressHandler} style={styles.visible_icon} name="visibility-off" />
          ))}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 90,
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
    color: "white",
    fontSize: 20,
  },
  input_container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginTop: 10,
    width: 230,
    height: 40,
  },
  label: {
    color: "white",
    fontSize: 19,
  },

  visible_icon: {
    fontSize: 18,
    padding: 5,
  },
});
