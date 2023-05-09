import { View, StyleSheet } from "react-native";
import FooterTag from "../footer_tag/FooterTag";

import { useDataProvider } from "../../context/Data";
import LanguageChange from "../language_change/LanguageChange";
import { useState } from "react";

const Footer = () => {
  const [toggleFooter, setToggleFooter] = useState<string>("");
  const { user } = useDataProvider();

  const onToggleFooter = (value: string) => {
    setToggleFooter(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <FooterTag
          toggleFooter={toggleFooter}
          onToggleFooter={onToggleFooter}
          text={"account"}
          to={user ? "user-page" : "sign-in"}
          icon={"account"}
        />
        <FooterTag
          toggleFooter={toggleFooter}
          onToggleFooter={onToggleFooter}
          text={"lotterys"}
          to="latest-lottery"
          icon={"history"}
        />
        <LanguageChange />
        <FooterTag
          toggleFooter={toggleFooter}
          onToggleFooter={onToggleFooter}
          text={"home"}
          to="home"
          icon={"home"}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
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
