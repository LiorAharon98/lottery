import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FooterTag from "../footer_tag/FooterTag";
import Modal from "react-native-modal";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useDataProvider } from "../../context/Data";
import CountryFlag from "react-native-country-flag";
const LanguageChange = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>("hebrew");
  const { i18n } = useTranslation();
  const { changeLanguage } = useDataProvider();
  const handleEvent = (e: string) => {
    i18n.changeLanguage(e);

    setCurrentLanguage(e);
    setToggleModal(false);
  };
  const onToggleModal = () => {
    setToggleModal(true);
  };
  const languageLabel = [{ label: "english" }, { label: "hebrew" }];
  return (
    <>
      <Modal isVisible={toggleModal}>
        <View style={styles.modal_container}>
          {languageLabel.map((label) => (
            <Pressable
              style={styles.language_container}
              key={label.label}
              onPress={handleEvent.bind(this, label.label)}
            >
              <Text>{changeLanguage(label.label)} </Text>
              <CountryFlag size={15} isoCode={label.label === "english" ? "us" : "il"} />
              {currentLanguage === label.label && <FontAwesome6 name="check" size={15} color="black" />}
            </Pressable>
          ))}
        </View>
      </Modal>
      <FooterTag text="Language" onPress={onToggleModal} icon="language" />
    </>
  );
};

export default LanguageChange;

const styles = StyleSheet.create({
  modal_container: {
    backgroundColor: "white",
    height: "20%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  language_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 100,
    alignItems: "center",
  },
});
