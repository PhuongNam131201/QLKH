import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAllUsers } from '../Services'
import color from '../../contains/color';
import Gold from '../../assets/Images/gold.png'
import Silver from '../../assets/Images/silver.png'
import Bronze from '../../assets/Images/bronze.png'
export default function LeaderBoard() {
  const [userList,setUserList]=useState([]);
    useEffect(()=>{
      GetAllUserDetails();
    },[])
  const GetAllUserDetails=()=>{
    
    GetAllUsers().then(resp=>{
      console.log(resp);
      resp && setUserList(resp?.userDetails)
    })
  }
  return (
    <View>
      <View style={{height:160,backgroundColor:color.primary,padding:30}}>
        <Text style={{fontSize:30,fontWeight:'bold',color:"#fff",position:'absolute',bottom:30,padding:30}}>Bảng xếp hạng</Text>
      </View>
      <View style={{}}>
        <FlatList
          data={userList}
            renderItem={({item,index})=>(
              <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',
              padding:20,backgroundColor:"#fff",marginHorizontal:20,borderRadius:15,marginVertical:10}}>
                  <View style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center',}}>
                    <Text style={{fontSize:24,fontWeight:'bold',color:color.grey,marginLeft:10}}>{index+1}</Text>
                    <Image source={{uri:item.profileImage}}
                       style={{width:60,height:60,borderRadius:100}}/>
                    <View>
                      <Text style={{fontSize:22,fontWeight:'bold'}}>{item.userName}</Text>
                      <Text style={{fontSize:18,fontWeight:'bold', color:color.third}}>{item.point} Điểm</Text>
                    </View>
                      
                  </View>
                      <View style={{}}>
                        {index<3?
                        <Image source={index + 1 ==1?Gold:index+1==2?Silver:Bronze}
                        style={{width:40,height:55}}/>
                        :null
                      }
                      </View>
              </View>
              
              
            )}
          />
      </View>
    </View>
  )
}