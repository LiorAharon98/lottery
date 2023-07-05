import { StyleSheet, Text, View,Linking } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Button from "../button/Button";
import { useDataProvider } from "../../context/Data";
import { useSelector } from "react-redux";
const ConnectBank = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const {hasBankAccount,changeLanguage } = useDataProvider();
  const user = useSelector(state=>state.user)
  const handlePress = async() => {
     await hasBankAccount(user.username);
    setToggleModal(false)
  };
  const handleLinkPress = ()=>{
    Linking.openURL('https://lioraharon98.github.io/bank/')
  }
  return (
    <>
      <Modal isVisible={toggleModal}>
        <View style={styles.container}>
          <Text style={styles.text}>{changeLanguage('to connect this user to Bank you have to register to Bank and identical username as this username')}</Text>

          <Text style={styles.link} onPress={handleLinkPress} >{changeLanguage('bank link')}</Text>
          <Button onPress={handlePress}>connect</Button>
        </View>
      </Modal>
      <Text>{changeLanguage('would you like to connect')}?</Text>
      <Button onPress={setToggleModal.bind(this, true)}>connect</Button>
    </>
  );
};

export default ConnectBank;

const styles = StyleSheet.create({
  container: {
    borderRadius :15,
    alignItems :'center',
    justifyContent :'space-around',
    backgroundColor: "white",
    height: 250,
  },
  link:{
    textDecorationLine :'underline',
    color :'rgb(21, 165, 241)',
    fontSize :20
  },
  text:{
    color :'rgb(21, 165, 241)',
    fontSize :16
  }
});
