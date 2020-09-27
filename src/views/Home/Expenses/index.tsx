// libs
import React, { useState, useEffect } from 'react'
import Styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Platform, FlatList, Animated } from 'react-native'
import { MaterialCommunityIcons, Fontisto, AntDesign } from '@expo/vector-icons'
import { observer } from 'mobx-react'

// store
import RootStore, { IBudget } from './../../../store/index'

// models
import { Expense, ExpenseType } from '../../../models'

interface Slide {
  isActive: boolean
}

interface ChartBar {
  height: number
}

const AnimatedText = Animated.Text
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient)

const { height, width } = Dimensions.get('window')
const SLICE_WIDTH = width * 0.3
const SLICE_SPACING = width * 0.2
const BAR_HEIGHT = 200
const ADD_EXPENSES_BUTTON_WIDTH = width * 0.2

export default observer(() => {
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0)
  const [currentYear, setCurrentYear] = useState('2020')

  const barHeightInterpolatedValue = new Animated.Value(0)
  const expensesOpacityInterpolatedValue = new Animated.Value(0)

  const animate = () => {
    Animated.parallel([
      Animated.timing(barHeightInterpolatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }),
      Animated.timing(expensesOpacityInterpolatedValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      })
    ], { stopTogether: false }).start()
  }

  useEffect(() => {
    animate()
  })

  const renderChartBars = () => {
    const selectedBudget = RootStore.selectedBudget

    if (selectedBudget) {
      return selectedBudget.expenses.map((expense, index) => {
        const base = (expense.value / selectedBudget.total)
        const percent = Math.round(parseFloat((base * 100).toFixed(2)))
        const barHeight = Math.floor(base * BAR_HEIGHT)

        return (
          <Expenses.ChartBarContainer key={`expense-bar-container-${index}`}>
            <Expenses.ChartBarWrapper key={`expense-bar-wrapper-${index}`}>
              {
                renderChartBarIcon(expense)
              }
              <Expenses.ChartBar style={{
                height: barHeightInterpolatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, barHeight]
                })
              }}
                height={barHeight} key={`expense-bar-${index}`} colors={['#c0ffaa', '#16ffff']}></Expenses.ChartBar>
            </Expenses.ChartBarWrapper>
            <Expenses.ChartBarPercentage>{percent} %</Expenses.ChartBarPercentage>
            <Expenses.ChartBarSum>€ {expense.value.toFixed(2)}</Expenses.ChartBarSum>
          </Expenses.ChartBarContainer>
        )
      })
    }

    return null
  }

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
                : expense.type === ExpenseType.MORTGAGE
                  ? <Expenses.ChartBarIconCommunityIcons name="bank-minus" size={32} color={'#fff'} />
                  : expense.type === ExpenseType.CLOTHES
                    ? <Expenses.ChartBarIconCommunityIcons name="tshirt-crew" size={32} color={'#fff'} />
                    : null
        }
      </Expenses.ChartBarIconWrapper>
    )
  }

  const addExpense = () => {
    const types = [ExpenseType.BILLS, ExpenseType.CLOTHES, ExpenseType.ENTERTAINMENT,
      ExpenseType.GROCERIES]

    const randomIndex = Math.floor(Math.random() * types.length)

    RootStore.addExpense(types[randomIndex], 15)
    animate()
  }

  return (
    <Expenses.Layout colors={['#0574e5', '#022b8d']}>
      <Expenses.MonthSliderWrapper>
        <Expenses.MonthSlider
          horizontal={true}
          data={RootStore.budgets as IBudget[]}
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
                <Expenses.SlideText isActive={index === currentSliceIndex}>{item.monthName}</Expenses.SlideText>
              </Expenses.SlideWrapper>
            )
          }
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.round(ev.nativeEvent.contentOffset.x / SLICE_WIDTH)
            const newSelectedBudget = RootStore.budgets[newIndex]

            RootStore.setSelectedBudget(newSelectedBudget)
            setCurrentSliceIndex(newIndex)
            setCurrentYear(newSelectedBudget.year)
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
          <Expenses.TotalExpensesSpacer></Expenses.TotalExpensesSpacer>
          <Expenses.RowContainer>
            <Expenses.TotalExpensesTitleWrapper>
              <Expenses.TotalExpensesTitle>Total Expenses</Expenses.TotalExpensesTitle>
            </Expenses.TotalExpensesTitleWrapper>
            <Expenses.TotalBudgetTitleWrapper>
              <Expenses.TotalBudgetTitle>Budget</Expenses.TotalBudgetTitle>
            </Expenses.TotalBudgetTitleWrapper>
          </Expenses.RowContainer>
        </Expenses.TotalExpansesRow>
        <Expenses.TotalExpansesRow>

          <Expenses.TotalExpensesCurrency>€</Expenses.TotalExpensesCurrency>
          <Expenses.RowContainer>
            <Expenses.TotalExpensesAmountWrapper>
              <Expenses.TotalExpensesAmount style={{
                opacity: expensesOpacityInterpolatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1]
                })
              }}>{RootStore.totalExpenses()?.wholeNumber}</Expenses.TotalExpensesAmount>
              <Expenses.TotalExpensesSubAmount style={{
                opacity: expensesOpacityInterpolatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1]
                })
              }}>{RootStore.totalExpenses()?.decimal}</Expenses.TotalExpensesSubAmount>
            </Expenses.TotalExpensesAmountWrapper>

            <Expenses.TotalBudgetAmountWrapper>
              <Expenses.TotalBudgetAmount>
                {RootStore.selectedBudget?.budget}
              </Expenses.TotalBudgetAmount>
            </Expenses.TotalBudgetAmountWrapper>
          </Expenses.RowContainer>

        </Expenses.TotalExpansesRow>
      </Expenses.TotalExpensesContainer>
      <Expenses.BottomContainer>
        <Expenses.TitleWrapper>
          <Expenses.SideTitle>Expenses</Expenses.SideTitle>
        </Expenses.TitleWrapper>
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
            renderChartBars()
          }
        </Expenses.ChartWrapper>
      </Expenses.BottomContainer>
      <Expenses.AddBudgetButtonContainer>
        <Expenses.AddBudgetButtonWrapper>
          <Expenses.AddBudgetButtonTouch onPress={() => addExpense()} onLongPress={() => addExpense()}>
            <Expenses.AddBudgetButton name="credit-card-plus-outline" size={32} color={'#022b8d'} />
          </Expenses.AddBudgetButtonTouch>
        </Expenses.AddBudgetButtonWrapper>
      </Expenses.AddBudgetButtonContainer>
    </Expenses.Layout>
  )
})

const Expenses = {
  Layout: Styled(LinearGradient)`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  `,
  MonthSliderWrapper: Styled.View`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 20%;
  `,
  MonthSlider: Styled(FlatList as new () => FlatList<IBudget>)`
    display: flex;
  `,
  MonthSliderPointerWrapper: Styled.View`
    display: flex;
    position: absolute;
    flex-direction: row;
    align-items: flex-end;
    top: 95px;
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
    width: 100%;
    align-self: flex-start;
    align-items: flex-end;
    justify-content: flex-end;
    padding-bottom: 30px;
    height: 25%;
  `,
  TotalExpansesRow: Styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
  `,
  RowContainer: Styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: ${width - SLICE_SPACING - 70}px;
    align-items: center;
  `,
  TotalExpensesTitleWrapper: Styled.View`
    display: flex;
  `,
  TotalExpensesSpacer: Styled.View`
    display: flex;
    width: ${SLICE_SPACING}px;
  `,
  TotalExpensesTitle: Styled.Text`
    display: flex;
    text-align: right;
    font-size: ${(props) => props.theme.font.size.smaller};
    color: ${(props) => props.theme.colors.light['shade-3']};
    font-family: ${(props) => props.theme.font.familyRegular};
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
  TotalExpensesAmountWrapper: Styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  `,
  TotalExpensesAmount: Styled(AnimatedText)`
    display: flex;
    font-size: ${(props) => props.theme.font.size.large};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  TotalExpensesSubAmount: Styled(AnimatedText)`
    display: flex;
    font-size: ${(props) => props.theme.font.size.mediumLarge};
    color: ${(props) => props.theme.colors.light['shade-3']};
    font-family: ${(props) => props.theme.font.familyLight};
    padding-bottom: 4px;
  `,
  TotalBudgetTitleWrapper: Styled.View`
    display: flex;
    align-items: flex-end;
  `,
  TotalBudgetTitle: Styled.Text`
    display: flex;
    font-size: ${(props) => props.theme.font.size.smaller};
    color: ${(props) => props.theme.colors.light['shade-3']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  TotalBudgetAmountWrapper: Styled.View`
    display: flex;
    flex-direction: row;
  `,
  TotalBudgetAmount: Styled.Text`
    display: flex;
    font-size: ${(props) => props.theme.font.size.large};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
    align-self: flex-end;
    align-content: flex-end;
  `,
  BottomContainer: Styled.View`
    display: flex;
    height: 55%;
    width: 100%;
    flex-direction: row;
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
    width: 270px;
    font-size: ${(props) => props.theme.font.size.large};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
    text-transform: uppercase;
    align-self: center;
    transform: rotate(-90deg);
    padding-left: 45px;
  `,
  ChartWrapper: Styled.ScrollView`
    display: flex;
    flex-direction: row;
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
  ChartBar: Styled(AnimatedGradient) <ChartBar>`
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
  ChartBarSum: Styled.Text`
    display: flex;
    position: absolute;
    top: 55px;
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
  `,
  AddBudgetButtonContainer: Styled.View`
    width: ${ADD_EXPENSES_BUTTON_WIDTH}px;
    height: ${ADD_EXPENSES_BUTTON_WIDTH}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 0;
    zIndex: 1;
  `,
  AddBudgetButtonWrapper: Styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 50px;
    width: 50px;
    background-color: #fff;
    border-radius: 50px;
    elevation: 5;
    shadowColor: #000000;
    shadowOffset: 0px 12px;
    shadowOpacity: 0.58;
    shadowRadius: 16px;
  `,
  AddBudgetButtonTouch: Styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    zIndex: 1;
  `,
  AddBudgetButton: Styled(MaterialCommunityIcons)`
    display: flex;
  `
}
