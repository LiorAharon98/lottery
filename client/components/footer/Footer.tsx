import { View, StyleSheet } from "react-native";
import FooterTag from "../footer_tag/FooterTag";
import { LinearGradient } from "expo-linear-gradient";

import LanguageChange from "../language_change/LanguageChange";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Index";
const Footer = () => {
  const [toggleFooter, setToggleFooter] = useState<string>("");
    const user = useSelector((state: RootState) => state.user);
  const onToggleFooter = (value: string) => {
    setToggleFooter(value);
  };
  return (
    <LinearGradient
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    colors={['white', "white"]}
  >

  
      <View style={styles.text_container}>
        <FooterTag
          toggleFooter={toggleFooter}
          onToggleFooter={onToggleFooter}
          text={"Account"}
          to={user.username ? "user-page" : "sign-in"}
          icon={"account"}
        />
        <FooterTag
          toggleFooter={toggleFooter}
          onToggleFooter={onToggleFooter}
          text={"Lotterys"}
          to="latest-lottery"
          icon={"history"}
        />
        <LanguageChange />
        <FooterTag
          toggleFooter={toggleFooter}
          onToggleFooter={onToggleFooter}
          text={"Home"}
          to="home"
          icon={"home"}
        />
      </View>
      </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius:5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  text_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
export default Footer;
