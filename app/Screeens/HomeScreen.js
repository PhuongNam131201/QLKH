import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../Components/HomeScreen/Header'
import color from '../../contains/color'
import CourseList from '../Components/HomeScreen/CourseList'
import { createNewUser, getUserDetail } from '../Services'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { UserPointsContext } from '../Context/UserPointsContext'
import CourseProgess from '../Components/HomeScreen/CourseProgess'

export default function HomeScreen() {
  const {isLoaded,signOut}=useAuth();
  const {user}=useUser();
  const {userPoints,setUserPoints}=useContext(UserPointsContext);

  useEffect(()=>{
    user &&createUser();

  },[user])
  const createUser=()=>{
    if(user){
      createNewUser(user.fullName,user.primaryEmailAddress.emailAddress,user.imageUrl)
      .then(resp=>{
        if(resp)
          GetUser()
      })
    }
  }
  
  const GetUser =()=>{
   
    getUserDetail(user.primaryEmailAddress.emailAddress).then(resp => {
      console.log("-- Điểm người dùng:", resp.userDetail?.point); // Kiểm tra giá trị
      setUserPoints(resp.userDetail?.point);
    }); 
  };
  
  return (
    <ScrollView>
        <View style={{backgroundColor:color.grey, height:300,padding:20}}>
          <Header/>
      </View>
      <View style={{padding:20}}>
        <View style={{marginTop:-140}}>
          <CourseProgess />
          <CourseList level={'coban'}/>
        </View>
        <CourseList level={'nangcao'}/>
      </View> 
    </ScrollView>
    
  )
}