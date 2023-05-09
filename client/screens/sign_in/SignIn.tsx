import { StyleSheet, Text, View,ScrollView } from "react-native";
import React, { useState } from "react";
import SignCard from "../../components/sign_card/SignCard";
import { useDataProvider } from "../../context/Data";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignIn = ({ navigation }: any) => {
  const { selectedUser } = useDataProvider();
  const [toggleError,setToggleError] = useState<string>("")
  const [toggleModal,setToggleModal] = useState<boolean>(false)
  const handleFunc = async (userName: string, password: string) => {
    setToggleModal(true)
    const checkUser = await selectedUser(userName, password);
    setToggleModal(false)
    if (!checkUser) return setToggleError("user not found");
    await AsyncStorage.setItem("key" , JSON.stringify(checkUser))
    if (!checkUser.lotteryNumbers) return navigation.navigate('create-user-lottery-numbers')

    navigation.navigate('user-page')
  };
  return (
    <>
    <View>
      <SignCard error={toggleError} handleFunc={handleFunc} text="sign in" />
      <LoadingScreen onToggleModal={setToggleModal.bind(this,false)} toggle={toggleModal}/>
    </View>
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
