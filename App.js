import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/Screeens/Login';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/Navigations/TabNavigation';
import { CompleteChapterContext } from './app/Context/CompleteChapter';
import { useState } from 'react';
import { UserPointsContext } from './app/Context/UserPointsContext';
export default function App() {
  const [isChapterComplete,setIsChapterComplete]=useState(false);
  const [userPoints,setUserPoints]=useState(10);
  return (
    
      <ClerkProvider 
      // tokenCache={tokenCache}
      publishableKey={"pk_test_c21hcnQtbmV3dC01Ni5jbGVyay5hY2NvdW50cy5kZXYk"}>       
            <UserPointsContext.Provider value={{userPoints,setUserPoints}}>
            <CompleteChapterContext.Provider value={{isChapterComplete,setIsChapterComplete}} >
            <SignedIn>
              <NavigationContainer>
                  <TabNavigation/>
              </NavigationContainer>
            </SignedIn>
            <SignedOut>
            <Login/>      
          </SignedOut>
            </CompleteChapterContext.Provider>
            </UserPointsContext.Provider>
      </ClerkProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
