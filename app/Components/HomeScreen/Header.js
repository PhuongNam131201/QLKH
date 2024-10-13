import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Pressable, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/clerk-expo'
import color from '../../../contains/color';
import Feather from '@expo/vector-icons/Feather';
import { UserPointsContext } from '../../Context/UserPointsContext';
import * as ImagePicker from 'expo-image-picker';

export default function Header() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut } = useAuth();  // Hàm để đăng xuất
    const { userPoints, setUserPoints } = useContext(UserPointsContext);
    const [modalVisible, setModalVisible] = useState(false);  // Trạng thái hiển thị của Modal
    const [image, setImage] = useState(user?.imageUrl);  // Trạng thái cho ảnh đại diện

    useEffect(() => {
        console.log("Updated userPoints:", userPoints);
    }, [userPoints]);

    const handleSignOut = () => {
        setModalVisible(false);
        signOut();  // Gọi hàm đăng xuất
    };

    // Hàm để mở thư viện ảnh và chọn ảnh
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

    return isLoaded && (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.img} onPress={() => setModalVisible(true)}>
                    <Image source={{ uri: image }}
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
                        <Image source={{ uri: image }}
                            style={{ width: 100, height: 100, borderRadius: 99, marginBottom: 10 }} />
                        <Text style={styles.modalText}>Xin chào, {user?.fullName}</Text>
                        <Text>Email: {user?.primaryEmailAddress.emailAddress}</Text>
                        <Text>Số điểm của bạn: {userPoints}</Text>

                        {/* Nút thay đổi ảnh đại diện */}
                        <TouchableOpacity style={styles.buttona} onPress={pickImage}>
                             <Text style={styles.buttonText}>Chọn ảnh đại diện</Text>
                        </TouchableOpacity>

                        <View style={{ display: 'flex', flexDirection: 'row', padding: 30 }}>
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
        margin: 10
    },
    buttonClose: {
        backgroundColor: color.background,
        width: 100,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttona: {
        backgroundColor: '#4CAF50', // Màu nền của nút
        padding: 15, // Khoảng cách giữa text và viền nút
        borderRadius: 10, // Bo góc nút
        alignItems: 'center', // Căn giữa text theo chiều ngang
        marginTop: 20, // Khoảng cách phía trên nút
      },
      buttonText: {
        color: '#fff', // Màu chữ
        fontSize: 16, // Kích thước chữ
        fontWeight: 'bold', // Độ dày của chữ
      },
});
