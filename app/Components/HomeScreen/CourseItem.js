import { StyleSheet,View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import color from '../../../contains/color';
export default function CourseItem({item}) {
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
   

 </View>
  )
}
const styles = StyleSheet.create({
    img:{
        width:200,
        height:100,
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