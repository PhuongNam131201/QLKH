import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import OptionItem from './OptionItem'
import color from '../../../contains/color'
import { enrollCourse } from '../../Services'

export default function DetailSection({courses,enrollCourse}) {
  return (
    <ScrollView>
        <View style={{padding:10,borderRadius:15,backgroundColor:'#fff',marginRight:15}}>
      <Image source={{uri:courses?.banner?.url}}
        style={{width:Dimensions.get('screen').width*0.88,height:190,borderRadius:15}}
      />
      <Text style={{fontSize:24,marginTop:10,fontWeight:'bold'}}>{courses.name}</Text>
      <View style={{padding:5}}>
        <OptionItem icon={'bookmark-border'} value={courses.chapter?.length + " Chương "}/>
        <OptionItem icon={'access-time'} value={courses.time +" giờ"}/>
        <OptionItem icon={'person-outline'} value={"Người tạo: " + courses.author }/>
        <OptionItem icon={'signal-cellular-alt'} value={"Mức độ "+(courses.level=='coban'?'Cơ Bản': 'Nâng Cao') }/>
      </View>
      <View>
            <Text style={{fontSize:20,fontWeight:'bold'}}>
                Mô tả
            </Text>
            <Text style={{fontSize:20,color:color.background,lineHeight:30}}>{courses.descripsion?.markdown}</Text>
      </View>
        <View style={{display:'flex',flexDirection:'column'}}>
            <View>
                <TouchableOpacity 
                onPress={()=>enrollCourse()}
                style={{padding:20,backgroundColor:color.third,borderRadius:15,alignItems:'center'}}>
                    <Text style={{fontSize:15}}>
                        Nhận khoá học miễn phí
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:20}}>
                <TouchableOpacity style={{padding:20,backgroundColor:color.button,borderRadius:15,alignItems:'center'}}>
                    <Text style={{fontSize:15,color:'#fff'}}>
                        Đăng ký Vip 
                        500.000 VNĐ/Tháng
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    </ScrollView>
  )
}