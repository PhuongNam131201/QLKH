import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import ContentItem from './ContentItem';
import color from '../../../contains/color';
import { useNavigation } from '@react-navigation/native';

export default function Content({ content,onChapterFinish }) {
  let contentRef;
  
  const navigation=useNavigation();
  const [activeIndex,setActiveIndex] =useState(0);
  const onNextBtnPress = (index)=>{
    if(content?.length<=index+1){
      // navigation.goBack();
      onChapterFinish()
      return;
    }
    setActiveIndex(index+1)
    contentRef.scrollToIndex({animted:true,index:index+1})
  }
  return (
    <View style={{padding:20,height:"100%"}}>
      <ProgressBar contentLength={content?.length} contentIndex={activeIndex} />
      <FlatList
        data={content}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={(ref)=>{
          contentRef=ref
        }}
        renderItem={({item,index})=>(
            <View style={{width:Dimensions.get('screen').width*0.9,padding:10,marginBottom:40}}>
                <Text
                  style={{
                      fontSize:20,
                      fontWeight:'bold',
                      marginTop:5,
                      

                  }}
                >{item.heading}</Text>
                <ContentItem desciption={item?.desciption?.html}
                              output={item?.output?.html}
                />
                <TouchableOpacity
                  onPress={()=>onNextBtnPress(index)}
                  >
                    <Text style={{
                      padding:15,
                      backgroundColor:color.button,
                      textAlign:'center',
                      color:"#fff",
                      fontSize:17,
                      borderRadius:10,
                    }}>
                      {
                          content?.length>index+1?'Tiếp theo':'Hoàn tất'
                      }
                    </Text>
                </TouchableOpacity>
            </View>
        )}
      />
    </View>
  );
}
