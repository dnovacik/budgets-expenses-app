// libs
import React, { useState } from 'react'
import Styled from 'styled-components/native'
import { Picker } from '@react-native-picker/picker'

// models
import { Currency } from '../../models'

// theme
import theme from '../../styled-components/theme'

interface PickerProps {
  label: string
  value: Currency
  onValueChange: (value: Currency) => void
}

export default ({ label, value, onValueChange }: PickerProps) => {
  return (
    <PickerView.Wrapper>
      <PickerView.Label>{label}:</PickerView.Label>
      <PickerView.PickerWrapper>
        <PickerView.Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => onValueChange(itemValue as Currency)}
          mode={'dialog'}
          itemStyle={{
            fontSize: 16,
            color: '#022b8d',
            fontFamily: theme.font.familyRegular,
          }}
        >
          {Object.values(Currency).map((currency, index) => {
            return (
              <PickerView.Picker.Item label={currency} value={currency} key={`currency-${index}`} />
            )
          })}
        </PickerView.Picker>
      </PickerView.PickerWrapper>
    </PickerView.Wrapper>
  )
}

const PickerView = {
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
  PickerWrapper: Styled.View`
    width: 90px;
    height: 30px;
    border-radius: 10px;
    background-color: #fff;
    border-width: 1px;
    border-color: #000;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.theme.font.size.smallLess};
    color: #022b8d;
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  Picker: Styled(Picker)`
    display: flex;
    width: 100%;
    color: #022b8d;
  `,
}
