import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../Screeens/HomeScreen'
import CourseDetailScreen from '../Screeens/CourseDetailScreen'
import ChapterContentScreen from '../Screeens/ChapterContentScreen'
const Stack=createStackNavigator()
export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='course-detail' component={CourseDetailScreen}/>
        <Stack.Screen name='chapte-content' component={ChapterContentScreen}/>
    </Stack.Navigator>
  )
}