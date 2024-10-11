import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/clerk-expo'
import color from '../../../contains/color';
import Feather from '@expo/vector-icons/Feather';
import { UserPointsContext } from '../../Context/UserPointsContext';

export default function Header() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut } = useAuth();  // Hàm để đăng xuất
    const { userPoints, setUserPoints } = useContext(UserPointsContext);
    const [modalVisible, setModalVisible] = useState(false);  // Trạng thái hiển thị của Modal

    useEffect(() => {
        console.log("Updated userPoints:", userPoints);
    }, [userPoints]);

    const handleSignOut = () => {
        setModalVisible(false);
        signOut();  // Gọi hàm đăng xuất
    };

    return isLoaded && (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.img} onPress={() => setModalVisible(true)}>
                    <Image source={{ uri: user?.imageUrl }}
                        style={{ width: 50, height: 50, borderRadius: 99 }} />
                    <View>
                        <Text style={styles.textTitle}> Xin chào,</Text>
                        <Text style={[styles.textTitle, { fontSize: 20 }]}>{user?.fullName}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.coin}>
                    <Image source={require('./../../../assets/Images/coin.png')}
                        style={{ width: 35, height: 35 }} />
                    <Text style={{ color: color.third }}>{userPoints}</Text>
                </View>
            </View>

            <View style={styles.search}>
                <TextInput
                    placeholder='Tìm kiếm'
                />
                <Feather name="search" size={24} color="black" />
            </View>

            {/* Modal hiển thị thông tin người dùng và đăng xuất */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{display:'flex',flexDirection:'row',gap:20,}}>
                        <Image source={{ uri: user?.imageUrl }}
                        style={{ width: 50, height: 50, borderRadius: 99 ,marginBottom:10}} />
                        <Text style={styles.modalText}>Xin chào, {user?.fullName}</Text>
                        </View>
                        <View style={{}}>
                            
                            <Text>Email: {user?.primaryEmailAddress.emailAddress}</Text>
                            <Text>Số điểm của bạn: {userPoints}</Text>

                        </View>
                        <View style={{display:'flex',flexDirection:'row',padding:30}}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={handleSignOut}>
                                <Text style={styles.textStyle}>Đăng xuất</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Đóng</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    img: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    textTitle: {
        color: color.second
    },
    coin: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    search: {
        backgroundColor: '#fff',
        borderRadius: 99,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        width: "100%",
        height: 50,
    },
    // Styles cho Modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        marginVertical:20
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
       
        shadowColor: color.second,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
        margin:10

    },
    buttonClose: {
        backgroundColor: color.background,
        width:100,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight:'bold'
    },
});
