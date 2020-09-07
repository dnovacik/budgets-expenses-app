// libs
import React from 'react'
import Styled from 'styled-components/native'
import { FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'

// theme
import theme from '../../styled-components/theme'

export default () => {
  return (
    <CustomNavbarItem.Wrapper>
      
    </CustomNavbarItem.Wrapper>
  )
}

const CustomNavbarItem = {
  Wrapper: Styled.View`
    display: flex;
    flex-direction: column;
    background-color: red;
    height: 70px;
    width: 70px;
  `
}