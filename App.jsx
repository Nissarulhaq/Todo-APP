import { View, useColorScheme, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect,  } from 'react'
import Completed from './components/Completed';
import Home from './components/Home';
import Incomplete from './components/Incomplete';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Myprovider } from './components/WholeContext';
import SplashScreen from './components/SplashScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Tab = createMaterialTopTabNavigator();
const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Hide the splash screen after a certain duration
    }, 1500); // Adjust the duration (in milliseconds) as needed
  }, []);
  const colorTheme = useColorScheme();
  return (
    < Myprovider >
      {loading ? (<SplashScreen />) : (
        <NavigationContainer >
          <View style={{ color: 'black', backgroundColor: colorTheme === 'dark' ? 'black' : 'white', }}>
            <Text style={{ textAlign: 'center', fontSize: 20, padding: 5, color: colorTheme === 'light' ? 'black' : 'white', }}>Your-ToDo List </Text>
          </View>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              tabBarLabelStyle: { color: colorTheme === 'light' ? 'black' : 'white', fontSize: 12, fontWeight: 'bold' },
              tabBarStyle: { backgroundColor: colorTheme === 'dark' ? 'black' : 'white' },
              indicatorStyle: { backgroundColor: 'white' },
              tabBarIndicatorStyle: { backgroundColor: '#E1DA00' },
              tabBarActiveTintColor:'#E1DA00',
              tabBarInactiveTintColor:'white',
              
            }} >
            {/* Todo text  in header  */}
            <Tab.Screen name="Home" component={Home}
              options={{
                tabBarIcon: ({focused}) => (
                  <Ionicons
                    name="home-outline"
                    // color={focused ? '#E1DA00':'white'}
                    color={colorTheme === 'light' ? 'black' : 'white'} 
                    size={28} style={{ margin: -2 }} />)
              }} />

            <Tab.Screen name="Incomplete" component={Incomplete}
              options={{
                tabBarIcon: ({focused}) => (
                  <EvilIcons name='paperclip'
                  // color={focused ? '#E1DA00':'white'}
                   color={colorTheme === 'light' ? 'black' : 'white'}
                    size={35} style={{ margin: -3 }} />)
              }} />

            <Tab.Screen name="Completed" component={Completed}
              options={{
                tabBarIcon: ({focused}) => (
                  <EvilIcons name='check'
                  // color={focused ? '#E1DA00':'white'}
                   color={colorTheme === 'light' ? 'black' : 'white'} 
                  size={33} style={{margin:-3 }} />)
              }}
            />

            {/* <Tab.Screen name='RecycleBin' component={RecycleBin}
              options={{
                tabBarIcon: () => (
                  <Ionicons name="trash-bin-outline" size={30} color={colorTheme === 'light' ? 'black' : 'white'} style={{ margin: -2 }}
                  />),
              }}
            /> */}
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </Myprovider >
  )
}
export default App

// Styling for Diffrent Components
const styles = StyleSheet.create({

  Container: {
    flex: 1,
    backgroundColor: 'gray',
  },

})