    import { StyleSheet,View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
    import React, { useEffect, useState } from 'react'
    import { getCourseList } from '../../Services'
    import SubHeading from '../SubHeading';

import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';
    export default function CourseList({level}) {
        const [courseList,setCourseList] = useState([]);
        const navigation = useNavigation();
        useEffect(()=>{
            getCourse();
        },[])
        const getCourse=()=>{
            getCourseList(level).then(resp=>{
                // console.log("RESP--",resp);
                setCourseList(resp?.courses)
            })
        }
    return (
        <View>
        <SubHeading text={'Khoá Học ' + (level=='coban'?'Cơ Bản': "Nâng Cao") } color={level == 'coban'&&"#fff"}/>
        <FlatList
            data={courseList}
            key={courseList.id}
            horizontal={true}
            renderItem={({item})=>(
                <TouchableOpacity onPress={()=>navigation.navigate('course-detail',{
                    courses:item
                })}>
                    <CourseItem item={item}/>
                </TouchableOpacity>
                
            )}
        />
            
        
        </View>
    )
    }
    