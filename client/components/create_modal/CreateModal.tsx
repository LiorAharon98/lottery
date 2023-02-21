import { StyleSheet, Text, View,Pressable } from "react-native";
import Modal from "react-native-modal";
import { GestureResponderEvent } from "react-native-modal/dist/types";
import  Icon  from "react-native-vector-icons/AntDesign";
import { useDataProvider } from "../../context/Data";

interface props {
  prizeNumber: number;
  guessNumber: number;
  activateModal: boolean;
  closeModal: (e: GestureResponderEvent) => void;
}
const CreateModal = ({ prizeNumber, guessNumber, activateModal, closeModal }: props) => {
const {changeLanguage} = useDataProvider()
  
  return (
    <Modal isVisible={activateModal}>
      <Pressable onPress={closeModal} >

      <View  style={styles.page_container}>
        <View style={styles.container}>
          <View style={styles.header}>
          </View>
          <Text>{changeLanguage('congratulations')} !</Text>
          <Text>{changeLanguage("you guess")} {guessNumber} {changeLanguage('numbers')}</Text>
          <Text>{changeLanguage('you won')} {prizeNumber}₪</Text>
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
    paddingTop: 8,
    paddingLeft: 5,
    backgroundColor: "rgb(66, 159, 255)",
    width: "100%",
    height: 40,
  },
});
