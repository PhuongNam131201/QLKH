import { View, Text,StyleSheet, Image } from 'react-native'
import React from 'react'
import CourseProgressBar from '../Components/HomeScreen/CourseProgressBar'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function CourseProgressItem({item,completedChapter}) {
    return (
      <View style={{padding:10,backgroundColor:'#fff',borderRadius:15,marginRight:15}}>
      <Image source={{uri:item?.banner?.url}}
           style={styles.img}
      />
      <View style={{padding:7}}>
           <Text style={styles.textImg}>
               {item.name}
           </Text>
           <View style={styles.containerTopList}>
           <View style={styles.textNote}>
               <AntDesign name="book" size={24} color="black" />
               <Text>
                   {item?.chapter?.length} Chương
               </Text>
           </View>
           <View style={styles.textNote}>
           <MaterialIcons name="access-time" size={24} color="black" />
               <Text>
                   {item?.time} giờ
               </Text>
           </View>
           </View>
           <Text style={styles.textPrice}>{item?.price==0?'Miễn phí':item.price}</Text>
      </View>
     
       {completedChapter!=undefined? 
       
       <CourseProgressBar
          totalChapter={item?.chapter?.length}
          completedChapter={completedChapter}
       />:null}
   </View>
    )
  }
  const styles = StyleSheet.create({
      img:{
          width:'100%',
          height:150,
          borderRadius:15
      },
      textImg:{
          fontSize:17,
          fontWeight:'bold'
      },
      textNote:{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          gap:5,
      },
      containerTopList:{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          paddingTop:5,
      },
      textPrice:{
          marginTop:5,
      }
  })