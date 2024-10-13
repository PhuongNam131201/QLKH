import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GetAllUsers } from '../Services'
import color from '../../contains/color';
import Gold from '../../assets/Images/gold.png'
import Silver from '../../assets/Images/silver.png'
import Bronze from '../../assets/Images/bronze.png'
import { UserPointsContext } from '../Context/UserPointsContext';

export default function LeaderBoard() {
  const { userPoints, setUserPoints } = useContext(UserPointsContext);
  const [userList,setUserList]=useState([]);
  
  useEffect(()=>{
    GetAllUserDetails();
  },[]);
  
  const GetAllUserDetails = () => {
    GetAllUsers().then(resp => {
      console.log(resp);
      resp && setUserList(resp?.userDetails);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headera}>
        <Text style={styles.headerText}>Bảng xếp hạng Cao thủ</Text>
        <Image source={require('./../../assets/Images/cup.png')}
        style={{width:70,height:50}}/>
        </View>
        <View style={{display:'flex',flexDirection:'row'}}>
          <Image source={require('./../../assets/Images/bac.png')}
          style={{width:50,height:50}}/>
          <Image source={require('./../../assets/Images/huy.png')}
          style={{width:50,height:50}}
          />
        </View>
        
      </View>
      
      <FlatList
        data={userList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
              <Text style={styles.indexText}>{index + 1}</Text>
              <Image 
                source={{ uri: item.profileImage }}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.userPoints}>{item.point} Điểm</Text>
              </View>
            </View>
            <View>
              {index < 3 &&
                <Image 
                  source={index + 1 === 1 ? Gold : index + 1 === 2 ? Silver : Bronze}
                  style={styles.medalImage}
                />
              }
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}  // Để thêm padding vào nội dung
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Đảm bảo View chiếm hết màn hình để FlatList có thể cuộn
  },
  header: {
    height: 160,
    backgroundColor: color.primary,
    padding: 30,
    // Canh giữa văn bản theo chiều dọc
   
  },
  headera: {
    
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:30
  },
  headerText: {
    fontSize:25,
    fontWeight: 'bold',
    color: "#fff",
   textAlign:'center',
    paddingLeft:20
    
    
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  indexText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.grey,
    marginLeft: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  userPoints: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.third,
  },
  medalImage: {
    width: 40,
    height: 55,
  },
  listContent: {
    paddingBottom: 20, // Thêm không gian ở cuối danh sách để cuộn mượt hơn
  },
});
