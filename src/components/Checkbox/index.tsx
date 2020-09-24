// libs
import React, { useState } from 'react'
import Styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

// theme
import theme from '../../styled-components/theme'

export default () => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox.Wrapper>
      <Checkbox.TouchableWrapper onPress={() => setChecked(!checked)} onLongPress={() => setChecked(!checked)}>
        <Checkbox.Box>
          {
            checked && <Checkbox.CheckX name={'check'} size={28} color={'#022b8d'} />
          }
        </Checkbox.Box>
        <Checkbox.LabelWrapper>
          <Checkbox.Label>Totoka</Checkbox.Label>
        </Checkbox.LabelWrapper>
      </Checkbox.TouchableWrapper>
    </Checkbox.Wrapper>
  )
}

const Checkbox = {
  Wrapper: Styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 150px;
  `,
  TouchableWrapper: Styled.TouchableOpacity`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  Box: Styled.View`
    display: flex;
    height: 30px
    width: 30px;
    border-radius: 10px;
    background-color: #fff;
    border-width: 1px;
    border-color: #000;
    align-items: center;
    justify-content: center;
  `,
  CheckX: Styled(AntDesign)`
    display: flex;
  `,
  LabelWrapper: Styled.View`
    display: flex;
    height: 30px;
    margin-left: 10px;
    align-items: center;
    justify-content: center;
  `,
  Label: Styled.Text`
    display: flex;
    font-size: ${(props) => props.theme.font.size.smallLess};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
    text-transform: uppercase;
  `
}