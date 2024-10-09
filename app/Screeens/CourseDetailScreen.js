import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { useUser } from '@clerk/clerk-expo';
import { enrollCourse } from '../Services';


export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params= useRoute().params;
  const {user}  = useUser();
  useEffect(()=>{
    console.log(params.courses)
  },[])
  const UseEnrollCourse=()=>{
    enrollCourse(params.courses.id,user.primaryEmailAddress.emailAddress)
    .then(resp=>{
      console.log(resp);
    })
  }
  return params.courses&&(
    <ScrollView>
      <View style={{paddingVertical:40, paddingLeft:20}}>
      <TouchableOpacity onPress={()=>navigate.goBack()}>
        <AntDesign name="back" size={35} color="black" />    
        
      </TouchableOpacity>
      <DetailSection courses={params.courses} enrollCourse={()=>UseEnrollCourse()}/>
      <ChapterSection chapterList={params.courses.chapter}/>
    </View>
    </ScrollView>
  )
}