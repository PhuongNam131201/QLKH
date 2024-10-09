import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Components/HomeScreen/Header'
import color from '../../contains/color'
import CourseList from '../Components/HomeScreen/CourseList'

export default function HomeScreen() {
  return (
    <View>
        <View style={{backgroundColor:color.grey, height:300,padding:20}}>
          <Header/>
      </View>
      <View style={{padding:20}}>
        <View style={{marginTop:-140}}>
          <CourseList level={'coban'}/>
        </View>
        <CourseList level={'coban'}/>
      </View>
      
      
    </View>
    
  )
}