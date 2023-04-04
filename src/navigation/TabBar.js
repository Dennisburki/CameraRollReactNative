import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import UserScreen from '../screens/UserScreen';
import GalerieScreen from '../screens/GalerieScreen';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  
  return (
    <Tab.Navigator
    initialRouteName='Profil'
      screenOptions={({ route }) => ({
        tabBarStyle: {
                  backgroundColor: '#6e64e7',             
                  borderTopColor: '#6e64e7',
                },
                headerShown: false,
                tabBarLabelStyle : {
                  color : 'white'
                },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Images') {
            iconName = 'home'
          } else if (route.name === 'Documents') {
            iconName = 'list'
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color='white'} />
          
        }

      })}
    >
      
      <Tab.Screen name="Images" component={GalerieScreen} />
      <Tab.Screen name="Documents" component={UserScreen}  />
    </Tab.Navigator>
  )
}

export default TabBar