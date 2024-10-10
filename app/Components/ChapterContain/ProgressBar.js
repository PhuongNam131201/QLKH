import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import color from '../../../contains/color';

export default function ProgressBar({contentLength, contentIndex}) {
    const arraySize = Array.from({ length: contentLength }, (_, index) => index);
    const width = 100 / contentLength;
  
    return (
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:30,padding:20 }}>
        {arraySize.map((item, index) => (
          <View 
            key={index} // Thêm key cho mỗi phần tử trong danh sách để tránh cảnh báo
            style={{
              backgroundColor:`${index<=contentIndex?color.button:color.grey}`,
              width: width+"%",
              borderRadius: 10,
              height: 10,
              margin: 5,
              flex:1
            }}>
          </View>
        ))}
      </View>
    );
  }