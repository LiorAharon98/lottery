import { StyleSheet, Text, View, Pressable, GestureResponderEvent } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FooterTag from "../footer_tag/FooterTag";
import Modal from "react-native-modal";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import { useDataProvider } from "../../context/Data";
import { useNavigation } from "@react-navigation/native";
const LanguageChange = () => {
  const navigation = useNavigation();
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const { changeLanguage } = useDataProvider();
  const handleEvent = (e: string) => {
    i18n.changeLanguage(e);
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
              <Text>{changeLanguage(label.label)}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>
      <FooterTag onPress={onToggleModal} icon={<Icon3 name="language" size={25} />} />
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
    padding: 10,
  },
});
