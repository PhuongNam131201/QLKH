import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RenderHtml from 'react-native-render-html';
import color from '../../../contains/color';
export default function ContentItem({desciption,output}) {
    const { width } = useWindowDimensions();
    const descripsionSource = {
        html:desciption
    }
    const outputSource ={
        html:output
    }
    const [isRun,setIsRun]=useState(false);
  return desciption&&(
    <View>
      {/* <Text>{desciption}</Text> */}
      <RenderHtml
      contentWidth={width}
      source={descripsionSource}
      tagsStyles={style}

    />
    {output != null? <TouchableOpacity 
        onPress={()=>setIsRun(true)}
        style={{marginBottom:20}}>
        <Text style={{padding:12,backgroundColor:color.button,borderRadius:10,
            width:100,fontSize:14,color:"#fff",textAlign:'center'
        }}>
            Run
        </Text>

    </TouchableOpacity>:null}
    {isRun?
    <>
    <Text style={{fontSize:20,fontWeight:'bold'}}>Output</Text>
    <RenderHtml
      contentWidth={width}
      source={outputSource}
      tagsStyles={style}

    /></>:null}
    </View>
  )
}
const style={
    body:{
        fontSize:20,
    },
    code:{
        backgroundColor:"black",
        color:"white",
        padding:20,
        borderRadius:20
    }
    
}