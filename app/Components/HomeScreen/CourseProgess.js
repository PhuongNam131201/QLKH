import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { GetAllProgressCourse } from '../../Services';
import SubHeading from '../SubHeading';
import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';

export default function CourseProgess() {
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
       <SubHeading text={'Tiếp tục học'}
       color='#fff'/>
        <FlatList
            data={progressCourseList}
          
            horizontal={true}
            renderItem={({item})=>(
                <TouchableOpacity 
                onPress={()=>navigation.navigate('course-detail',{
                    courses:item.course
                })}
                >
                    <CourseItem item={item.course}
                    completedChapter={item?.completedChapter?.length}/>
                </TouchableOpacity>
                
            )}
        />
    </View>
  )
}