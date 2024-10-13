import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';
import color from '../../contains/color';
import AntDesign from '@expo/vector-icons/AntDesign';
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Xử lý nếu cần thiết
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, [startOAuthFlow]);

    return (
        <View style={styles.container}>
            <View>
                <Image style={{width:400,height:300}}
                source={require('./../../assets/Images/hinhlogin.png')}/>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Hãy cùng mình học tập để trao dồi thêm kiến thức lập trình.</Text>
            </View>
            
            <TouchableOpacity style={styles.googleButton} onPress={onPress}>
                <AntDesign name="google" size={24} color="red" />
                <Text style={styles.googleButtonText}>Đăng nhập với Google</Text>
            </TouchableOpacity>       
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Bằng cách đăng ký, bạn đồng ý với <Text style={styles.linkText}>Điều khoản</Text>,{' '}
                    <Text style={styles.linkText}>Chính sách riêng tư</Text> và{' '}
                    <Text style={styles.linkText}>Sử dụng cookie</Text> của chúng tôi.
                </Text>
                <Text style={styles.footerText}>
                    Bạn đã có một tài khoản? <Text style={styles.loginText}>Đăng nhập</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: color.background,
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color:color.button
    },
    googleButton: {
        backgroundColor: color.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        display:'flex',
        flexDirection:'row',
        gap:10
    },
    googleButtonText: {
        color: color.third,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center',
        paddingLeft:10
    },
    orText: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 14,
        color: '#666',
    },
   
    footer: {
        alignItems: 'center',
        marginTop: 40,
    },
    footerText: {
        fontSize: 12,
        color: color.primary,
        textAlign: 'center',
        marginBottom: 5,
    },
    linkText: {
        color: '#1DA1F2',
    },
    loginText: {
        color: '#1DA1F2',
        fontWeight: 'bold',
    },
});
