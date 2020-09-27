// libs
import React, { useState } from 'react'
import Styled from 'styled-components/native'

// theme
import theme from '../../styled-components/theme'

interface InputProps {
  label: string
  value: string
  placeholder: string
  onValueChange: (value: string) => void
}

export default ({ label, value, placeholder, onValueChange }: InputProps) => {
  return (
    <Input.Wrapper>
      <Input.Label>{label}:</Input.Label>
      <Input.Input keyboardType={'numeric'} value={value} placeholder={placeholder} onChangeText={onValueChange} />
    </Input.Wrapper>
  )
}

const Input = {
  Wrapper: Styled.View`
    display: flex;
    margin: 20px 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  Label: Styled.Text`
    display: flex;
    margin: 0 0 5px 2px;
    font-size: ${(props) => props.theme.font.size.smallLess};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  Input: Styled.TextInput`
    display: flex;
    border-radius: 10px;
    background-color: #fff;
    border-width: 1px;
    border-color: #000;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.theme.font.size.smallLess};
    color: #022b8d;
    font-family: ${(props) => props.theme.font.familyRegular};
    padding: 0 10px;
    height: 30px;
    width: 200px;
  `
}