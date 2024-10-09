import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import color from '../../../contains/color';
import Feather from '@expo/vector-icons/Feather';
export default function Header() {
    const {isLoaded,isSignedIn,user}=useUser();
  return  isLoaded&&(
    <View>
        <View style={styles.container}>
        <View style={styles.img}>
            <Image source={{uri:user?.imageUrl}}
            style={{width:50,height:50,borderRadius:99}}/>
            <View>
                <Text style={styles.textTitle}> Xin chào,</Text>
                <Text style={[styles.textTitle,{fontSize:20}]}>{user?.fullName}</Text>
            </View>
        </View>
        <View style={styles.coin}>
            <Image source={require('./../../../assets/Images/coin.png')}
                style={{width:35,height:35}}
            />
            <Text style={{color:color.third}}>10000</Text>
        </View>
        </View>
        <View style={styles.search}>
            <TextInput
                placeholder='Tìm kiếm'               
                />
                <Feather name="search" size={24} color="black" />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:40,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        justifyContent:'space-between'
    },
    img:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    },
    textTitle:{
        color:color.second
    },
    coin:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
    },
    search:{
        backgroundColor:'#fff',
        borderRadius:99,
        padding:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:10,
        width:"100%",
        height:50,
    },
    textSearch:{
        fontSize:15,
    }
})