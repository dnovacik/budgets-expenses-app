// libs
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// views
import Home from './views/Home'
import About from './views/About'

const Stack = createStackNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
