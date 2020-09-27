// libs
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

// navbar
import CustomNavbar from './components/CustomNavbar'

// views
// onboarding
import Onboarding from './views/Onboarding'

// home
import Dashboard from './views/Home/Dashboard'
import Expenses from './views/Home/Expenses'
import Stats from './views/Home/Stats'
import Settings from './views/Home/Settings'

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const screenOptions = (tabVisible: boolean = true) => {
    return { options: { tabBarVisible: tabVisible ? true : false } }
  }

  return (
    <Tab.Navigator tabBar={(props) => <CustomNavbar {...props} />} initialRouteName="Expenses">
      <Tab.Screen name="Dashboard" component={Dashboard} {...screenOptions(true)} />
      <Tab.Screen name="Expenses" component={Expenses} {...screenOptions(true)} />
      <Tab.Screen name="Stats" component={Stats} {...screenOptions(true)} />
      <Tab.Screen name="Settings" component={Settings} {...screenOptions(true)} />
    </Tab.Navigator>
  )
}

const Router = createStackNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Router.Navigator headerMode="none" initialRouteName="Onboarding">
        <Router.Screen name="Onboarding" component={StackNavigator} />
        <Router.Screen name="Home" component={TabNavigator} />
      </Router.Navigator>
    </NavigationContainer>
  )
}
