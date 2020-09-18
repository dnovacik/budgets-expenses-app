// libs
import React from 'react'
import Styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'

// components
import Checkbox from './../../components/Checkbox'

const { height, width } = Dimensions.get('window')
const SLICE_SPACING = width * 0.2

export default () => {
  const navigation = useNavigation()

  const onContinuePress = () => {
    navigation.navigate('Home')
  }

  return (
    <Onboarding.Layout colors={['#0574e5', '#022b8d']}>
      <Onboarding.LeftWrapper>
        <Onboarding.TitleWrapper>
          <Onboarding.SideTitle>Budgets N' Expenses</Onboarding.SideTitle>
        </Onboarding.TitleWrapper>
      </Onboarding.LeftWrapper>
      <Onboarding.RightWrapper>
        <Onboarding.MainTextWrapper>
          <Onboarding.MainText>
            Hantoka
        </Onboarding.MainText>
        </Onboarding.MainTextWrapper>
        <Onboarding.MainSettingsWrapper>
          <Onboarding.Checkbox />
        </Onboarding.MainSettingsWrapper>
        <Onboarding.ButtonContainer>
          <Onboarding.ButtonWrapper onPress={() => onContinuePress()} onLongPress={() => onContinuePress()}>
            <Onboarding.ContinueArrow size={32} color={'#000'} name={'arrowright'}></Onboarding.ContinueArrow>
          </Onboarding.ButtonWrapper>
        </Onboarding.ButtonContainer>
      </Onboarding.RightWrapper>
    </Onboarding.Layout>
  )
}

const Onboarding = {
  Layout: Styled(LinearGradient)`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
  `,
  LeftWrapper: Styled.View`
    display: flex;
    height: 100%;
    width: ${SLICE_SPACING}px;
  `,
  MainTextWrapper: Styled.View`
    display: flex;
    height: 50%;
    background-color: cyan;
  `,
  MainText: Styled.Text`
    display: flex;
  `,
  MainSettingsWrapper: Styled.View`
    display: flex;
    height: 50%;
  `,
  Checkbox: Styled(Checkbox)`
    display: flex;
  `,
  RightWrapper: Styled.View`
    display: flex;
    width: ${width - SLICE_SPACING}px;
    height: 100%;
  `,
  TitleWrapper: Styled.View`
    display: flex;
    height: 100%;
    width: ${SLICE_SPACING}px;
    align-items: center;
    justify-content: center;
  `,
  SideTitle: Styled.Text`
    display: flex;
    width: ${height}px;
    font-size: ${(props) => props.theme.font.size.large};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
    text-transform: uppercase;
    align-self: center;
    transform: rotate(-90deg);
    padding-left: 45px;
`,
  ButtonContainer: Styled.View`
    display: flex;
    height: 10%;
    width: 100%;
    position: absolute;
    bottom: 0;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
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
    margin-right: 15px;
    elevation: 5;
    shadowColor: #000000;
    shadowOffset: 0px 12px;
    shadowOpacity: 0.58;
    shadowRadius: 16px;
  `,
  ContinueArrow: Styled(AntDesign)`
    display: flex;
  `,
  Title: Styled.Text`
    font-size: ${(props) => props.theme.font.size.medium};
  `,
}
