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
        <CustomNavbar.StatsButton name="chart-pie" size={32} color={'#022b8d'} />
      </CustomNavbar.ButtonWrapper>
      <CustomNavbar.ButtonWrapper onPress={() => navigation.navigate('Expenses')}>
        <CustomNavbar.ExpensesButton name="credit-card-minus-outline" size={32} color={'#022b8d'} />
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
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 40%;
    width: 70px;
    zIndex: 1;
  `,
  ButtonWrapper: Styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 50px;
    width: 50px;
    background-color: #fff;
    border-radius: 50px;
    margin-top: 15px;
    elevation: 5;
    shadowColor: #000000;
    shadowOffset: 0px 12px;
    shadowOpacity: 0.58;
    shadowRadius: 16px;
  `,
  StatsButton: Styled(FontAwesome5)`
    display: flex;
  `,
  ExpensesButton: Styled(MaterialCommunityIcons)`
    display: flex;
  `
}