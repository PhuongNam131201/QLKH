import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function OptionItem({icon,value}) {
  return (
    <View style={styles.textNote}>
    <MaterialIcons name={icon} size={24} color="black" />
    <Text>
        {value}
    </Text>
</View>
  )
}
const styles = StyleSheet.create({
   
    textNote:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:5,
    },
   
})