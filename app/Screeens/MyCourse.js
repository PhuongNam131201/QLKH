import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import color from '../../contains/color'
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { GetAllProgressCourse } from '../Services';
import CourseItem from '../Components/HomeScreen/CourseItem';
import CourseProgressItem from '../MyCourse/CourseProgressItem';

export default function MyCourse() {
  const {user}=useUser();
  const [progressCourseList,setProgressCourseList]=useState();
  const navigation=useNavigation();
  useEffect(()=>{
      user && GetAllProgressCourseList()
  },[user])
  const GetAllProgressCourseList=()=>{
      GetAllProgressCourse(user.primaryEmailAddress.emailAddress)
          .then(resp=>{
              setProgressCourseList(resp.userConrolledCourses)
          })
      
  }
  return (
    <View>
      <View style={{height:160,backgroundColor:color.button,padding:30}}>
        <Text style={{fontSize:30,fontWeight:'bold',color:"#fff",position:'absolute',bottom:30,padding:30}}>Khoá học của tôi</Text>
      </View>
      
      <FlatList
            data={progressCourseList}
            style={{marginTop:-40}}
          
            renderItem={({item})=>(
                <TouchableOpacity 
                style={{margin:8,padding:5}}
                onPress={()=>navigation.navigate('course-detail',{
                    courses:item.course
                })}
                >
                    <CourseProgressItem item={item.course}
                    completedChapter={item?.completedChapter?.length}/>
                </TouchableOpacity>
                
            )}
        />
      
      
    </View>
  )
}