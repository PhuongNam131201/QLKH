    import { View, Text, ToastAndroid, ScrollView, Alert } from 'react-native'
    import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContain/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapter';
import { UserPointsContext } from '../Context/UserPointsContext';
import { useUser } from '@clerk/clerk-expo';
    
    export default function ChapterContentScreen() {
        const navigation =useNavigation();
        const {isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext);
        const {userPoints,setUserPoints}=useContext(UserPointsContext);
        const {user} = useUser();
        const param =useRoute().params;
        useEffect(()=>{
          // console.log("ChapterId",param.chapterId)
          // console.log("RecordId",param.userCourseRecordId)
        },[param])
        const onChapterFinish =()=>{
          const totalPoints=Number(userPoints)+param.content?.length*10;
          MarkChapterCompleted(param.chapterId,param.userCourseRecordId,
            user.primaryEmailAddress.emailAddress,totalPoints).then(resp=>{
          
            if(resp){
              setUserPoints(prevPoints => prevPoints + param.content?.length * 10);
              ToastAndroid.show('Đã hoàn thành bài học !!',ToastAndroid.LONG)
              Alert
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