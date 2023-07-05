import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useDataProvider } from "../../context/Data";
import { useState,useEffect } from "react";

const LoadingScreen = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const { changeLanguage,fetchAllLottery } = useDataProvider();
  const handleFunc = async()=>{
 setToggleModal(true)
 await fetchAllLottery()
 setToggleModal(false)

  }
  useEffect(() => {
    handleFunc();
  }, []);
  const onToggleModal= ()=>{
    setToggleModal(true)
  }
  return (
    <>
      <Modal isVisible={toggleModal}>
        <Pressable style={styles.pressable_container} onPress={onToggleModal}>
          <View style={styles.container}>
            <Text style={styles.text}>{changeLanguage("Loading")}</Text>
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
    flexDirection: "row",
    justifyContent: "center",
    height: 120,
    backgroundColor: "white",
  },
  text: {
    color: "rgb(55, 185, 255)",
    margin: 20,
    fontSize: 22,
  },
});
