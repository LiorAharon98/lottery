import { ActivityIndicator, GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useDataProvider } from "../../context/Data";
interface props {
  toggle: boolean;
  onToggleModal: (e: GestureResponderEvent) => void;
}

const LoadingScreen = ({ toggle, onToggleModal }: props) => {
  const {changeLanguage} = useDataProvider()
  return (
    <>
      <Modal isVisible={toggle}>
        <Pressable style={styles.pressable_container} onPress={onToggleModal}>

          <View style={styles.container}>
            <Text style={styles.text}>{changeLanguage('Loading')}</Text>
            <ActivityIndicator size={"large"} color="rgb(55, 185, 255)" />
        </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({

  pressable_container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container: {
    borderRadius: 10,
    alignItems: "center",
    flexDirection : 'row',
    justifyContent: "center",
    height: 150,
    backgroundColor: "white",
  },
  text: {

    color:"rgb(55, 185, 255)",
    margin : 20,
    fontSize: 22,
  },
});
