import { StyleSheet, Pressable, View, Text } from "react-native";
import { GestureResponderEvent } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDataProvider } from "../../context/Data";
import { StackActions } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
  const lowerCaseText = text.toLocaleLowerCase();
  return (
    <Pressable onPress={pressHandler}>
      <View style={styles.container}>
        {lowerCaseText === "account" && (
          <MaterialIcons
            style={toggleFooter === text ? styles.active : styles.inactive}
            name="account-circle"
            size={24}
            color="black"
          />
        )}
        {lowerCaseText === "lotterys" && (
          <AntDesign
            style={toggleFooter === text ? styles.active : styles.inactive}
            name="dollar-circle"
            size={24}
            color="black"
          />
        )}
        {lowerCaseText === "home" && (
          <FontAwesome
            style={toggleFooter === text ? styles.active : styles.inactive}
            name="home"
            size={24}
            color="black"
          />
        )}
        {lowerCaseText === "language" && (
          <MaterialIcons
            style={toggleFooter === text ? styles.active : styles.inactive}
            name="language"
            size={24}
            color="black"
          />
        )}
        <Text style={toggleFooter === text ? styles.active : styles.inactive}>{changeLanguage(text)}</Text>
      </View>
    </Pressable>
  );
};

export default FooterTag;

const styles = StyleSheet.create({
  active: {
    color: "rgb(55, 103, 255)",
  },
  inactive: {
    color: "black",
    opacity: 0.4,
  },
  container: {
    width: 70,
    alignItems: "center",
  },
});
