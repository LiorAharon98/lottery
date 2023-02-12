import { StyleSheet, Text, View,Pressable } from "react-native";
import Modal from "react-native-modal";
import React,{useState,useEffect} from "react";
import { GestureResponderEvent } from "react-native-modal/dist/types";
import  Icon  from "react-native-vector-icons/AntDesign";

interface props {
  prizeNumber: number;
  guessNumber: number;
  activateModal: boolean;
  closeModal: (e: GestureResponderEvent) => void;
}
const CreateModal = ({ prizeNumber, guessNumber, activateModal, closeModal }: props) => {

  
  return (
    <Modal isVisible={activateModal}>
      <Pressable onPress={closeModal} >

      <View  style={styles.page_container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon onPress={closeModal} name="close" size={25}/>
          </View>
          <Text>congratulations</Text>
          <Text>you guess {guessNumber} numbers</Text>
          <Text>you won {prizeNumber}₪</Text>
        </View>
      </View>
      </Pressable>
    </Modal>
  );
};

export default CreateModal;

const styles = StyleSheet.create({
  page_container: {
    height :'105%',
    width : '100%',
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    borderRadius: 15,
    width: "95%",
    height: "30%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  header: {
    borderRadius : 5,
    paddingTop: 8,
    paddingLeft: 5,
    backgroundColor: "rgb(66, 159, 255)",
    width: "100%",
    height: 40,
  },
});
