import { View, Text, TouchableOpacity, ToastAndroid,StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import color from '../../../contains/color';
import { useNavigation } from '@react-navigation/native';
import { isType, isTypeNode } from 'graphql';
import { CompleteChapterContext } from '../../Context/CompleteChapter';
export default function ChapterSection({chapterList,userEnrolledCourse}) {
  const {isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext);
  const navigation = useNavigation();
  console.log(userEnrolledCourse[0]?.completedChapter)
  const OnChapterPress =(chapter)=>{
    if(userEnrolledCourse.length ==0){
      ToastAndroid.show('Vui lòng đăng ký khoá học trước',ToastAndroid.LONG)
      return ;
    }
    else{
      setIsChapterComplete(false);
      navigation.navigate('chapte-content',{
        content:chapter.content,
        chapterId:chapter.id,
        userCourseRecordId:userEnrolledCourse[0]?.id
      })
    }
  }
  const checkIsChapterCompleted=(chapterId)=>{
    if(userEnrolledCourse[0]?.completedChapter?.length<=0){
      return false;
    } 
    const resp = userEnrolledCourse[0]?.completedChapter
    .find(item=>item.chapterId==chapterId)
    return resp;
  } 
  
  return chapterList && (
    <View style={{padding:10,backgroundColor:'#fff',borderRadius:15,marginTop:20}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>Danh sách bài học</Text>
      {chapterList.map((item,index)=>
      (     <TouchableOpacity 
                key={item.id}
              style={[checkIsChapterCompleted(item.id)?styles.containera:styles.container]}
            
            onPress={()=>OnChapterPress(item)}
      >
                <View style={{display:'flex',flexDirection:"row",alignItems:'center',gap:10}}>
                    <Text style={{fontSize:27, fontWeight:'bold',color:color.grey}}>{index+1}</Text>
                    <Text style={{fontSize:22,color:color.grey}}>{item.title}</Text>
                </View>
              {userEnrolledCourse.length ==0? 
              <AntDesign name="lock" size={30} color="grey" />
            :
            <AntDesign name="play" size={30} color={checkIsChapterCompleted(item.id)?'green':'grey'} />}  
            </TouchableOpacity>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:"row",
    alignItems:'center',
    gap:10,
    justifyContent:'space-between',
    padding:19,
    borderWidth:1,
    borderRadius:10,
    marginRight:15,
    marginTop:5,
    borderColor:color.grey
  },
  containera:{
    display:'flex',
    flexDirection:"row",
    alignItems:'center',
    gap:10,
    justifyContent:'space-between',
    padding:19,
    borderWidth:1,
    borderRadius:10,
    marginRight:15,
    marginTop:5,
    borderColor:"#5AE8571C",
    backgroundColor:"#5AE8571C"
  },
})