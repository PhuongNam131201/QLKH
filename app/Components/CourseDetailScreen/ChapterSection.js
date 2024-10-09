import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import color from '../../../contains/color';
export default function ChapterSection({chapterList}) {
  return chapterList&& (
    <View style={{padding:10,backgroundColor:'#fff',borderRadius:15,marginTop:20}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>Danh sách bài học</Text>
      {chapterList.map((item,index)=>
      (     <View style={{display:'flex',flexDirection:"row",alignItems:'center',gap:10,justifyContent:'space-between',padding:19,
                borderWidth:1,borderRadius:10,marginRight:15,marginTop:5,borderColor:color.primary
      }}>
                <View style={{display:'flex',flexDirection:"row",alignItems:'center',gap:10}}>
                    <Text style={{fontSize:27, fontWeight:'bold'}}>{index+1}</Text>
                    <Text style={{fontSize:22}}>{item.title}</Text>
                </View>
                <AntDesign name="play" size={30} color="black" />
            </View>
      ))}
    </View>
  )
}