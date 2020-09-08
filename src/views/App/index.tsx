// libs
import React, { useEffect } from 'react'
import Styled from 'styled-components/native'
import { BackHandler, Alert } from 'react-native'

// components
import Router from '../../navigation'

export default () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Quit", "Are you sure you want to exit?", [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp()
        }
      ])

      return true
    }

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)

    return () => backHandler.remove()
  }, [])

  return (
    <App.Layout>
      <App.Body>
        <Router />
      </App.Body>
    </App.Layout>
  )
}

const App = {
  Layout: Styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.light['shade-1']};
  `,
  Body: Styled.View`
    flex: 1;
  `,
}
