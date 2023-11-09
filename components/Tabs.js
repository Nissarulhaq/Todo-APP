import { View, useColorScheme, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect, } from 'react'
import Completed from './components/Completed';
import Home from './components/Home';
import Incomplete from './components/Incomplete';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const Tab = createMaterialTopTabNavigator();
const Tabs = () => {
    return (

        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarLabelStyle: { color: colorTheme === 'light' ? 'black' : 'white', fontSize: 12, fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: colorTheme === 'dark' ? 'black' : 'white' },
                indicatorStyle: { backgroundColor: 'white' },
                tabBarIndicatorStyle: { backgroundColor: '#E1DA00' },
                tabBarActiveTintColor: '#E1DA00',
                tabBarInactiveTintColor: 'white',

            }} >
            {/* Todo text  in header  */}
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="home-outline"
                            // color={focused ? '#E1DA00':'white'}
                            color={colorTheme === 'light' ? 'black' : 'white'}
                            size={28} style={{ margin: -2 }} />)
                }} />

            <Tab.Screen name="Incomplete" component={Incomplete}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <EvilIcons name='paperclip'
                            // color={focused ? '#E1DA00':'white'}
                            color={colorTheme === 'light' ? 'black' : 'white'}
                            size={35} style={{ margin: -3 }} />)
                }} />

            <Tab.Screen name="Completed" component={Completed}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <EvilIcons name='check'
                            // color={focused ? '#E1DA00':'white'}
                            color={colorTheme === 'light' ? 'black' : 'white'}
                            size={33} style={{ margin: -3 }} />)
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


    )
}

export default Tabs

const styles = StyleSheet.create({})