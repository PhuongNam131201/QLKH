import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/Screeens/Login';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/Navigations/TabNavigation';
export default function App() {
  return (
    
      <ClerkProvider publishableKey={"pk_test_c21hcnQtbmV3dC01Ni5jbGVyay5hY2NvdW50cy5kZXYk"}>          
            <SignedIn>
              <NavigationContainer>
                  <TabNavigation/>
              </NavigationContainer>
            </SignedIn>
            <SignedOut>
            <Login/>      
          </SignedOut>
      </ClerkProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
