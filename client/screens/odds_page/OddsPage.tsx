import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import { useDataProvider } from '../../context/Data'

const OddsPage = () => {
  const [loopNum,setLoopNum] = useState<number>(0)
  const {user} = useDataProvider()
  const handlePress = (index : number)=>{
    // for(let i =0; i<loopNum;i++){
    //   user.lotteryNum[index]
    // }
  }
  return (
  <Card height={500}>

    <Text>how many loop?</Text>
    <Input color='black' onChange={setLoopNum} label='loop num'/>
    <View>
 <Button onPress={handlePress.bind(this,0)}>first column</Button>
    </View>
    <View>
 <Button onPress={handlePress.bind(this,1)}>second column</Button>
    </View>
  </Card>
  )
}

export default OddsPage

const styles = StyleSheet.create({})