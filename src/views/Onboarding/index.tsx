// libs
import React, { useState, useEffect } from 'react'
import Styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'

// components
import Checkbox from './../../components/Checkbox'
import Input from './../../components/Input'
import Picker from './../../components/Picker'

// models
import { Currency } from '../../models'

// store
import { initializeStore } from './../../store/index'

const { height, width } = Dimensions.get('window')
const SLICE_SPACING = width * 0.2

export default () => {
  const navigation = useNavigation()

  const [currency, setCurrency] = useState<Currency>(Currency.EURO)
  const [monthlyBudget, setMonthlyBudget] = useState(0)
  const [startBudgetChecked, setStartBudgetChecked] = useState(false)
  const [startAmount, setStartAmount] = useState(0)

  useEffect(() => {
    if (!startBudgetChecked) {
      setStartAmount(0)
    }
  }, [startBudgetChecked])

  const onContinuePress = () => {
    initializeStore(currency, monthlyBudget, startAmount)
    navigation.navigate('Home')
  }

  const onMonthlyBudgetValueChange = (value: string) => {
    const newAmount = parseFloat(value)

    if (!isNaN(newAmount)) {
      setMonthlyBudget(newAmount)

      return;
    }

    setMonthlyBudget(0)
  }

  const onAmountInputValueChange = (value: string) => {
    const newAmount = parseFloat(value)

    if (!isNaN(newAmount)) {
      setStartAmount(newAmount)

      return;
    }

    setStartAmount(0)
  }

  return (
    <Onboarding.Layout colors={['#0574e5', '#022b8d']}>
      <Onboarding.LeftWrapper>
        <Onboarding.TitleWrapper>
          <Onboarding.SideTitle>
            Budgets
            <Onboarding.SideSubTitle>  and  </Onboarding.SideSubTitle>
            Expenses
          </Onboarding.SideTitle>
        </Onboarding.TitleWrapper>
      </Onboarding.LeftWrapper>
      <Onboarding.RightWrapper>
        <Onboarding.MainTextWrapper>
          <Onboarding.MainText>
            Budgets and Expenses will help you save your money and visualize your progress
        </Onboarding.MainText>
        </Onboarding.MainTextWrapper>
        <Onboarding.MainSettingsWrapper>
          <Onboarding.CurrencySelect value={currency} label={'Currency'} onValueChange={setCurrency} />
          <Onboarding.Input label={'Monthly Budget'} value={monthlyBudget !== 0 ? monthlyBudget.toString() : ''} placeholder={'your monthly budget'} onValueChange={onMonthlyBudgetValueChange} />
          <Onboarding.Checkbox checked={startBudgetChecked} label={'With Start Amount'} onCheckedChanged={setStartBudgetChecked} />
          <Onboarding.Hint>
            (your starting amount, this will be used for your budget stats and future predictions)
          </Onboarding.Hint>
          {
            startBudgetChecked && <Onboarding.Input label={'Start Amount'} value={startAmount !== 0 ? startAmount.toString() : ''} placeholder={'your starting amount'} onValueChange={onAmountInputValueChange} />
          }
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
  SideSubTitle: Styled.Text`
    font-size: ${(props) => props.theme.font.size.mediumLarge};
    font-family: ${(props) => props.theme.font.familyRegular};
    text-transform: uppercase;
    transform: rotate(-90deg);
  `,
  RightWrapper: Styled.View`
    display: flex;
    width: ${width - SLICE_SPACING}px;
    height: 100%;
  `,
  MainTextWrapper: Styled.View`
    display: flex;
    height: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  MainText: Styled.Text`
    display: flex;
    padding: 0 20px;
    font-size: ${(props) => props.theme.font.size.medium};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  MainSettingsWrapper: Styled.View`
    display: flex;
    height: 50%;
    flex-direction: column;
    padding: 0 20px;
    justify-content: flex-start;
  `,
  CurrencySelect: Styled(Picker)`
    display: flex;
    width: 100%;
    margin: 10px 0;
  `,
  Checkbox: Styled(Checkbox)`
    display: flex;
    width: 100%;
    margin: 10px 0;
  `,
  Input: Styled(Input)`
    display: flex;
    width: 100%;
  `,
  Hint: Styled.Text`
    display: flex;
    font-size: ${(props) => props.theme.font.size.smallLess};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  AmountInput: Styled.TextInput`
    display: flex;
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
