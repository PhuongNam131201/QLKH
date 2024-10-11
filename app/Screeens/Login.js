import { View, Text, Button,StyleSheet } from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';
import color from '../../contains/color';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, [startOAuthFlow]);

    return (
        <View>
            <View style={styles.container}>
            
            <Button 
            title="Đăng nhập với Google" onPress={onPress} />
            
        </View>
        <View style={{marginTop:50}}>
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>Nguyễn Phương Nam</Text>
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>2124802010457</Text>
         </View>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:100,
        backgroundColor:color.grey,
    },
    
})
