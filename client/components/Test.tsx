import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './button/Button'

const Test = () => {
  const createTest = ()=>{
    console.log("dasds")
  }
  return (
    <View>
      <Text>Test</Text>
      <Button onPress={createTest}>fdasda</Button>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})