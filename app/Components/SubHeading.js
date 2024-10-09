import { View, Text } from 'react-native'
import React from 'react'

export default function SubHeading({text,color="black"}) {
  return (
    <View>
      <Text style={{
            fontSize:24,
            fontWeight:'bold',
            color:color,
            padding:8
      }}>
        {text}
      </Text>
    </View>
  )
}