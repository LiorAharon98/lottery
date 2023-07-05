import { StyleSheet,View } from "react-native";
import React, { useState } from "react";
import SignCard from "../../components/sign_card/SignCard";
import { useDataProvider } from "../../context/Data";
import SignCardModal from "../../components/sign_card_modal/SignCardModal";

const SignUp = ({ navigation }: any) => {
  const [toggleError,setToggleError] = useState<string>('')
  const [toggleModal,setToggleModal] = useState<boolean>(false)
  const {addUser} = useDataProvider()
  const handleFunc = async(username : string ,password: string)=>{
    setToggleModal(true)
    const user = await addUser(username,password)
    setToggleModal(false)
    if (!user)return setToggleError("user already exist")
    navigation.navigate('create-user-lottery-numbers')
  }
  return (
    <View>
      <SignCard error={toggleError} handleFunc={handleFunc} text="sign up"/>
      <SignCardModal toggle={toggleModal} onToggleModal={setToggleModal.bind(this,false)}/>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
