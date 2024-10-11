import { View, Text } from 'react-native'
import React from 'react'
import color from '../../contains/color'

export default function ProfileScreen() {
  return (
    <View>
      <View style={{height:160,backgroundColor:color.button,padding:30}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:"#fff",position:'absolute',bottom:30,padding:30,textAlign:"center"}}>Thông tin người dùng</Text>
      </View>
    </View>
    
  )
}