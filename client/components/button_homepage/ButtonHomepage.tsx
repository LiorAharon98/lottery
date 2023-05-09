import { Pressable, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDataProvider } from "../../context/Data";
import { props } from "../../types/type";
const ButtonHomepage = ({ children, onPress }: props) => {
  const { changeLanguage } = useDataProvider();
  return (
    <Pressable onPress={onPress}>
      <LinearGradient style={styles.container} colors={["rgb(41, 185, 254)", "rgb(156, 220, 254)"]}>
        <Text style={styles.text}>{changeLanguage(children)}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default ButtonHomepage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

    height: 55,
    width: "100%",

    backgroundColor: "black",
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
