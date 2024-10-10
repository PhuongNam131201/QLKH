    import { View, Text, ToastAndroid, ScrollView } from 'react-native'
    import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContain/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapter';
    
    export default function ChapterContentScreen() {
        const navigation =useNavigation();
        const {isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext);
        const param =useRoute().params;
        useEffect(()=>{
          console.log("ChapterId",param.chapterId)
          console.log("RecordId",param.userCourseRecordId)
        },[param])
        const onChapterFinish =()=>{
          MarkChapterCompleted(param.chapterId,param.userCourseRecordId).then(resp=>{
          
            if(resp){
              ToastAndroid.show('Đã hoàn thành bài học !!',ToastAndroid.LONG)
              setIsChapterComplete(true);
              navigation.goBack();
            }
          })
          navigation.goBack();
        }
      return param.content&&(
        <ScrollView>
          <Content content={param.content}
            onChapterFinish={()=>onChapterFinish()}
            />
          
        </ScrollView>
      )
    }