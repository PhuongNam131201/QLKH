import { View, Text } from 'react-native'
import React from 'react'
import color from '../../../contains/color'

export default function CourseProgressBar({totalChapter,completedChapter}) {
    const width=(completedChapter/totalChapter)*100+"%"
  return (
    <View style={{
        width:'100%',
        height:7,
        backgroundColor:color.grey,
        borderRadius:100
    }}>
      <View
      style={{
        width:width,
        height:7,
        backgroundColor:color.button,
        borderRadius:100
    }}
      >

      </View>
    </View>
  )
}