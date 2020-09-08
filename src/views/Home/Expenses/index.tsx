// libs
import React, { useState, useEffect } from 'react'
import Styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Platform, FlatList } from 'react-native'
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons'

// services
import { getMonthsInYearFromNow } from './../../../services/date'// services
import { cachedBudgets } from './../../../services/store'

// models
import { MonthsOutput, Budget, Expense, ExpenseType } from '../../../models'

interface CurrentMonthExpense {
  budget?: Budget
  default: boolean
}

interface MonthTotalExpenses {
  value: number
  wholeNumber: string
  decimal: string
  default: boolean
}

interface Slide {
  isActive: boolean
}

interface ChartBar {
  height: number
}

const { width, height } = Dimensions.get('window')
const SLICE_WIDTH = width * 0.3
const SLICE_SPACING = width * 0.2
const BAR_HEIGHT = 200

export default () => {
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0)
  const [currentYear, setCurrentYear] = useState(2020)
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState<CurrentMonthExpense>()
  const [currentMonthTotalExpenses, setCurrentMonthTotalExpenses] = useState<MonthTotalExpenses>({ value: 0.0, wholeNumber: '0', decimal: '.0', default: true })

  const months = getMonthsInYearFromNow()

  useEffect(() => {
    const key = months[currentSliceIndex].key
    const newValue = parseInt(key.split('.').shift() ?? '2020')

    setCurrentMonthExpenses({ budget: cachedBudgets.budgets.find(b => b.date === key), default: false })
    setCurrentYear(newValue)
  }, [currentSliceIndex])

  useEffect(() => {
    const total = currentMonthExpenses?.budget?.expenses.map(b => b.value).reduce((prev, next) => prev + next)

    if (total) {
      const totalString = total.toFixed(2).split('.')
      setCurrentMonthTotalExpenses({ value: total, wholeNumber: totalString.shift() ?? '0', decimal: `.${totalString.shift() ?? '0'}`, default: false })
    }
  }, [currentMonthExpenses])

  const renderChartBarIcon = (expense: Expense) => {
    return (
      <Expenses.ChartBarIconWrapper>
        {
          expense.type === ExpenseType.GROCERIES
            ? <Expenses.ChartBarIconFontistoIcons name="shopping-basket" size={26} color={'#fff'} />
            : expense.type === ExpenseType.ENTERTAINMENT
              ? <Expenses.ChartBarIconCommunityIcons name="glass-flute" size={32} color={'#fff'} />
              : expense.type === ExpenseType.BILLS
                ? <Expenses.ChartBarIconCommunityIcons name="home-currency-usd" size={32} color={'#fff'} />
                : null
        }
      </Expenses.ChartBarIconWrapper>
    )
  }

  return (
    <Expenses.Layout colors={['#0574e5', '#022b8d']}>
      <Expenses.Title>Expenses</Expenses.Title>
      <Expenses.MonthSliderWrapper>
        <Expenses.MonthSlider
          horizontal={true}
          data={months}
          keyExtractor={(item, index) => `${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          decelerationRate={'fast'}
          bounces={false}
          scrollEventThrottle={16}
          snapToAlignment={'start'}
          snapToInterval={SLICE_WIDTH}
          renderToHardwareTextureAndroid
          pagingEnabled
          contentInset={{
            top: 0,
            left: SLICE_SPACING,
            bottom: 0,
            right: SLICE_SPACING
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SLICE_SPACING : 0,
            // check this one, can't pick last item
            paddingRight: SLICE_SPACING * 2.5,
            alignItems: 'center'
          }}
          renderItem={({ item, index }) =>
            (
              <Expenses.SlideWrapper>
                <Expenses.SlideText isActive={index === currentSliceIndex}>{item.name}</Expenses.SlideText>
              </Expenses.SlideWrapper>
            )
          }
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.round(ev.nativeEvent.contentOffset.x / SLICE_WIDTH)

            setCurrentSliceIndex(newIndex)
          }}>
        </Expenses.MonthSlider>
        <Expenses.MonthSliderPointerWrapper>
          <Expenses.MonthSliderPointer>
            |
          </Expenses.MonthSliderPointer>
          <Expenses.MonthSliderPointerText>
            {currentYear}
          </Expenses.MonthSliderPointerText>
        </Expenses.MonthSliderPointerWrapper>
      </Expenses.MonthSliderWrapper>
      <Expenses.TotalExpensesContainer>
        <Expenses.TotalExpansesRow>
          <Expenses.TotalExpensesTitle>Total Expenses</Expenses.TotalExpensesTitle>
        </Expenses.TotalExpansesRow>
        <Expenses.TotalExpansesRow>
          <Expenses.TotalExpensesCurrency>€</Expenses.TotalExpensesCurrency>
          <Expenses.TotalExpensesAmount>{currentMonthTotalExpenses.wholeNumber}</Expenses.TotalExpensesAmount>
          <Expenses.TotalExpensesSubAmount>{currentMonthTotalExpenses.decimal}</Expenses.TotalExpensesSubAmount>
        </Expenses.TotalExpansesRow>
      </Expenses.TotalExpensesContainer>
      <Expenses.ChartWrapper
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'start'}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
        {
          currentMonthExpenses && !currentMonthExpenses?.default && !currentMonthTotalExpenses.default && currentMonthExpenses.budget?.expenses.map((expense, index) => {
            const base = (expense.value / currentMonthTotalExpenses.value)
            const percent = Math.round(parseFloat((base * 100).toFixed(2)))
            const barHeight = Math.floor(base * BAR_HEIGHT)

            return (
              <Expenses.ChartBarContainer key={`expense-bar-container-${index}`}>
                <Expenses.ChartBarWrapper key={`expense-bar-wrapper-${index}`}>
                  {
                    renderChartBarIcon(expense)
                  }
                  <Expenses.ChartBar height={barHeight} key={`expense-bar-${index}`} colors={['#c0ffaa', '#16ffff']}></Expenses.ChartBar>
                </Expenses.ChartBarWrapper>
                <Expenses.ChartBarPercentage>{percent} %</Expenses.ChartBarPercentage>
              </Expenses.ChartBarContainer>
            )
          })
        }
      </Expenses.ChartWrapper>
    </Expenses.Layout>
  )
}

const Expenses = {
  Layout: Styled(LinearGradient)`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  `,
  Title: Styled.Text`
    display: flex;
    padding-left: ${SLICE_SPACING}px;
    padding-top: 30px;
    height: 10%;
    width: 100%;
    font-size: ${(props) => props.theme.font.size.medium};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  MonthSliderWrapper: Styled.View`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 10%;
  `,
  MonthSlider: Styled(FlatList as new () => FlatList<MonthsOutput>)`
    display: flex;
  `,
  MonthSliderPointerWrapper: Styled.View`
    display: flex;
    position: absolute;
    flex-direction: row;
    align-items: flex-end;
    top: 55px;
    width: 100%;
    padding-left: ${SLICE_SPACING + 15}px;
  `,
  MonthSliderPointer: Styled.Text`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20px;
    font-size: ${(props) => props.theme.font.size.small};
    color: ${(props) => props.theme.colors.light['shade-1']};
  `,
  MonthSliderPointerText: Styled.Text`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: ${(props) => props.theme.font.size.small};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  SlideWrapper: Styled.View`
    display: flex;
    width: ${SLICE_WIDTH}px;
  `,
  SlideText: Styled.Text<Slide>`
    display: flex;
    font-size: ${(props) => props.theme.font.size.small};
    color: ${(props) => props.isActive ? props.theme.colors.light['shade-1'] : props.theme.colors.light['shade-3']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  TotalExpensesContainer: Styled.View`
    display: flex;
    flex-direction: column;
    width: 55%;
    align-self: flex-start;
    align-items: flex-end;
    justify-content: flex-end;
    padding-bottom: 30px;
    height: 30%;
  `,
  TotalExpansesRow: Styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
  `,
  TotalExpensesTitle: Styled.Text`
    display: flex;
    text-align: right;
    font-size: ${(props) => props.theme.font.size.smaller};
    color: ${(props) => props.theme.colors.light['shade-3']};
    font-family: ${(props) => props.theme.font.familyRegular};
    padding-left: ${SLICE_SPACING}px;
  `,
  TotalExpensesCurrency: Styled.Text`
    display: flex;
    font-size: ${(props) => props.theme.font.size.small};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
    padding-bottom: 5px;
    width: ${SLICE_SPACING}px;
    text-align: center;
  `,
  TotalExpensesAmount: Styled.Text`
    display: flex;
    font-size: ${(props) => props.theme.font.size.large};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  TotalExpensesSubAmount: Styled.Text`
    display: flex;
    font-size: ${(props) => props.theme.font.size.mediumLarge};
    color: ${(props) => props.theme.colors.light['shade-3']};
    font-family: ${(props) => props.theme.font.familyLight};
    padding-bottom: 4px;
  `,
  ChartWrapper: Styled.ScrollView`
    display: flex;
    flex-direction: row;
    height: 50%;
    padding-left: ${SLICE_SPACING}px;
  `,
  ChartBarContainer: Styled.View`
    display: flex;
    height: ${BAR_HEIGHT + 120}px;
    width: 70px;
    margin-left: 2.5px;
    align-items: center;
  `,
  ChartBarWrapper: Styled.View`
    display: flex;
    background-color: #235db6;
    position: absolute;
    bottom: 50px;
    height: ${BAR_HEIGHT + 70}px;
    align-items: center;
    width: 70px;
  `,
  ChartBar: Styled(LinearGradient) <ChartBar>`
    display: flex;
    position: absolute;
    bottom: 0;
    width: 70px;
    height: ${(props) => props.height}px;
  `,
  ChartBarPercentage: Styled.Text`
    display: flex;
    position: absolute;
    bottom: 20px;
    font-size: ${(props) => props.theme.font.size.smaller};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  ChartBarIconWrapper: Styled.View`
    display: flex;
    width: 70px;
    height: 70px;
    align-items: center;
    justify-content: center;
  `,
  ChartBarIconCommunityIcons: Styled(MaterialCommunityIcons)`
    display: flex;
  `,
  ChartBarIconFontistoIcons: Styled(Fontisto)`
    display: flex;
  `
}
