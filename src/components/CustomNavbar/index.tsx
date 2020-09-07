// libs
import React from 'react'
import Styled from 'styled-components/native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'

// theme
import theme from '../../styled-components/theme'

export default ({ state, descriptors, navigation }: BottomTabBarProps) => {
  
  return (
    <CustomNavbar.Wrapper>
      <CustomNavbar.ButtonWrapper onPress={() => navigation.navigate('Stats')}>
        <CustomNavbar.ButtonIcon name="chart-pie" size={32} color={'#fff'} />
      </CustomNavbar.ButtonWrapper>
    </CustomNavbar.Wrapper>
  )
}

const CustomNavbar = {
  Wrapper: Styled.View`
    position: absolute;
    left: 0;
    top: 60%;
    display: flex;
    flex-direction: column;
    background-color: red;
    height: 40%;
    width: 70px;
    zIndex: 1;
  `,
  ButtonWrapper: Styled.TouchableWithoutFeedback`
    display: flex;
  `,
  ButtonIcon: Styled(FontAwesome5)`
    display: flex;
  `
}