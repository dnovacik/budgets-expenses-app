// libs
import React from 'react'
import Styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default () => {
  const navigation = useNavigation()

  const onContinuePress = () => {
    navigation.navigate('Home')
  }

  return (
    <Onboarding.Layout>
      <Onboarding.Title>Onboarding Component</Onboarding.Title>
      <Onboarding.Button onPress={onContinuePress}>
        <Onboarding.ContinueArrow name="arrowright" size={28} color={'#000'} />
      </Onboarding.Button>
    </Onboarding.Layout>
  )
}

const Onboarding = {
  Layout: Styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  `,
  Button: Styled.TouchableWithoutFeedback`
    display: flex;
  `,
  ContinueArrow: Styled(AntDesign)`
    display: flex;
  `,
  Title: Styled.Text`
    font-size: ${(props) => props.theme.font.size.medium};
  `,
}
