import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screeens/HomeScreen';
import MyCourse from '../Screeens/MyCourse';
import LeaderBoard from '../Screeens/LeaderBoard';
import ProfileScreen from '../Screeens/ProfileScreen';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeScreenNavigation from './HomeScreenNavigation';

const Tab=createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false
    }}>
        <Tab.Screen name='Trang chủ' component={HomeScreenNavigation}
            options={{
                tabBarIcon:({color,size})=>(
                    <Entypo name="home" size={size} color={color} />
                )
            }}/>
        <Tab.Screen name='Khoá học của tôi' component={MyCourse}
        options={{
            tabBarIcon:({color,size})=>(
                <AntDesign name="book" size={size} color={color} />
                
            )
        }}/>
        <Tab.Screen name='BXH' component={LeaderBoard}
        options={{
            tabBarIcon:({color,size})=>(
                <MaterialIcons name="leaderboard" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='Thông tin' component={ProfileScreen}
        options={{
            tabBarIcon:({color,size})=>(
                <AntDesign name="profile" size={size} color={color}  />
            )
        }}/>
    </Tab.Navigator>
  )
}