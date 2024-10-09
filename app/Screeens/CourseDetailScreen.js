import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { useUser } from '@clerk/clerk-expo';
import { enrollCourse, getUserEnrolledCourse } from '../Services';


export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params= useRoute().params;
  const [userEnrolledCourse,setUserEnrolledCourse]=useState([]);
  const {user}  = useUser();
  
  useEffect(()=>{
    console.log(params.courses);
    if(user&&params.courses){
      GetUserEnrolledCourse();
    }
  },[params.courses,user])
  const UseEnrollCourse=()=>{
    enrollCourse(params.courses.id,user.primaryEmailAddress.emailAddress)
    .then(resp=>{
      // console.log(resp);
    })
  }
  const GetUserEnrolledCourse=()=>{
    getUserEnrolledCourse(params.courses.id,user.primaryEmailAddress.emailAddress)
    .then(resp=>{
      // console.log(resp.userEnrolledCourse);
      setUserEnrolledCourse(resp.userEnrolledCourse)
    })
  }
  return params.courses&&(
    <ScrollView>
      <View style={{paddingVertical:40, paddingLeft:20}}>
      <TouchableOpacity onPress={()=>navigate.goBack()}>
        <AntDesign name="back" size={35} color="black" />    
        
      </TouchableOpacity>
      <DetailSection courses={params.courses} 
      userEnrolledCourse={userEnrolledCourse}
      enrollCourse={()=>UseEnrollCourse()}/>
      <ChapterSection chapterList={params.courses.chapter}/>
    </View>
    </ScrollView>
  )
}