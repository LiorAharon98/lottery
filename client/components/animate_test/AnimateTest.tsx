import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import Animated from 'react-native-reanimated'
import {SlideInUp} from "react-native-reanimated"
const AnimateTest = () => {
  return (
<Animated.View entering={SlideInUp}>
    <Text>hello</Text>
</Animated.View>
  )
}

export default AnimateTest

const styles = StyleSheet.create({})