import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'

import color from '../../contains/color'
import * as ImagePicker from 'expo-image-picker'
import { UserPointsContext } from '../Context/UserPointsContext'

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();  // Hàm để đăng xuất
  const { userPoints } = useContext(UserPointsContext);  // Lấy điểm người dùng từ Context
  const [modalVisible, setModalVisible] = useState(false);  // Trạng thái hiển thị Modal
  const [image, setImage] = useState(user?.imageUrl);  // Ảnh đại diện của người dùng

  // Hàm để mở thư viện ảnh và chọn ảnh mới
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);  // Cập nhật trạng thái với ảnh mới
    }
  };

  // Hàm xử lý đăng xuất
  const handleSignOut = () => {
    setModalVisible(false);
    signOut();  // Gọi hàm đăng xuất từ `useAuth`
  };

  return (
    <View >
      <View style={{height:160,backgroundColor:color.primary,padding:30,display:'flex',flexDirection:'row',gap:10,paddingTop:70}}>
        <Text style={{fontSize:30,fontWeight:'bold',color:"#fff"}}>Thông tin </Text>
        <Image source={require('./../../assets/Images/tt.png')} style={{width:70,height:50}}/>
      </View>
      <View style={{backgroundColor:color.background,height:600,}}>
        <View style={styles.header}>
          <Image source={{ uri: image }} style={styles.avatar}  onPress={pickImage}/>
          <Text style={styles.name}>{user?.fullName}</Text>
          <Text style={styles.email}>{user?.primaryEmailAddress.emailAddress}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.points}>Số điểm của bạn: {userPoints}</Text>
          
          
        </View>
        <View style={{display:'flex',flexDirection:'row',marginTop:70}}>
          <TouchableOpacity style={styles.buttona} onPress={pickImage}>
            <Image source={require('./../../assets/Images/a.png')} style={{width:70,height:50}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttona} onPress={handleSignOut}>
            <Image source={require('./../../assets/Images/dxa.png')} style={{width:70,height:50}}/>
         </TouchableOpacity>
        </View>
        
      </View>
      

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
  
    
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop:10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.button,
  },
  email: {
    fontSize: 16,
    color: color.primary,
  },
  body: {
    marginTop: 30,
    alignItems: 'center',
    
  },
  points: {
    fontSize: 18,
    color: color.third,
    marginBottom: 20,
  },
  button: {
    backgroundColor: color.button,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  
});
