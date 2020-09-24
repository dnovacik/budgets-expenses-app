// libs
import React, { useState, useEffect } from 'react'
import Styled from 'styled-components/native'
import { LineChart } from 'react-native-svg-charts'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Platform, FlatList, Animated } from 'react-native'
import { observer } from 'mobx-react'
import * as shape from 'd3-shape'

// store
import RootStore, { IBudget } from './../../../store/index'

const AnimatedText = Animated.Text

interface Slide {
  isActive: boolean
}

const { width, height } = Dimensions.get('window')
const SLICE_WIDTH = width * 0.3
const SLICE_SPACING = width * 0.2

export default observer(() => {
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0)
  const [currentYear, setCurrentYear] = useState('2020')

  const data = [10, 25, 15, 20, 35, 50, 79, 17, 34, 62, 12]
  const data2 = [10, 25, 15, 20, 35, 50, 79, 17, 34, 62, 12].reverse()

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

  return (
    <Stats.Layout colors={['#0574e5', '#022b8d']}>
      <Stats.MonthSliderWrapper>
        <Stats.MonthSlider
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
            paddingRight: SLICE_SPACING * 2.5,
            alignItems: 'center'
          }}
          renderItem={({ item, index }) =>
            (
              <Stats.SlideWrapper>
                <Stats.SlideText isActive={index === currentSliceIndex}>{item.monthName}</Stats.SlideText>
              </Stats.SlideWrapper>
            )
          }
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.round(ev.nativeEvent.contentOffset.x / SLICE_WIDTH)
            const newSelectedBudget = RootStore.budgets[newIndex]

            RootStore.setSelectedBudget(newSelectedBudget)
            setCurrentSliceIndex(newIndex)
            setCurrentYear(newSelectedBudget.year)
          }}>
        </Stats.MonthSlider>
        <Stats.MonthSliderPointerWrapper>
          <Stats.MonthSliderPointer>
            |
          </Stats.MonthSliderPointer>
          <Stats.MonthSliderPointerText>
            {currentYear}
          </Stats.MonthSliderPointerText>
        </Stats.MonthSliderPointerWrapper>
      </Stats.MonthSliderWrapper>
      <Stats.TotalExpensesContainer>
        <Stats.TotalExpansesRow>
          <Stats.TotalExpensesTitle>Total Expenses</Stats.TotalExpensesTitle>
        </Stats.TotalExpansesRow>
        <Stats.TotalExpansesRow>
          <Stats.TotalExpensesCurrency>€</Stats.TotalExpensesCurrency>
          <Stats.TotalExpensesAmount style={{
            opacity: expensesOpacityInterpolatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }}>{RootStore.totalExpenses()?.wholeNumber}</Stats.TotalExpensesAmount>
          <Stats.TotalExpensesSubAmount style={{
            opacity: expensesOpacityInterpolatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }}>{RootStore.totalExpenses()?.decimal}</Stats.TotalExpensesSubAmount>
        </Stats.TotalExpansesRow>
      </Stats.TotalExpensesContainer>
      <Stats.BottomContainer>
        <Stats.TitleWrapper>
          <Stats.SideTitle>Stats</Stats.SideTitle>
        </Stats.TitleWrapper>
        <Stats.ChartsContainer
          horizontal={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
          snapToAlignment={'start'}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Stats.ChartWrapper>
            <Stats.Chart
              data={data}
              curve={shape.curveBasis}
              svg={{
                strokeWidth: 2,
                stroke: '#c0ffaa'
              }} />
          </Stats.ChartWrapper>
          <Stats.ChartWrapper>
            <Stats.Chart
              data={data2}
              curve={shape.curveBasis}
              svg={{
                strokeWidth: 2,
                stroke: '#c0ffaa'
              }} />
          </Stats.ChartWrapper>
          <Stats.ChartWrapper>
            <Stats.Chart
              data={data}
              curve={shape.curveBasis}
              svg={{
                strokeWidth: 2,
                stroke: '#c0ffaa'
              }} />
          </Stats.ChartWrapper>
        </Stats.ChartsContainer>
      </Stats.BottomContainer>

    </Stats.Layout>
  )
})

const Stats = {
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
    width: 55%;
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
  ChartsContainer: Styled.ScrollView`
    display: flex;
    flex-direction: column;
    height: 320px;
    margin-right: 10px;
    align-self: center;
  `,
  ChartWrapper: Styled.View`
    display: flex;
    flex-direction: row;
    height: 150px;
    width: 100%;
    background-color: #235db6;
    margin-bottom: 10px;
    padding: 10px 0;
    border-radius: 16px;
    align-items: flex-end;
    justify-content: center;
  `,
  Chart: Styled(LineChart)`
    display: flex;
    width: 90%;
    height: 50%;
  `,
  ChartTextWrapper: Styled.View`
    display: flex;
    width: 90%;
    align-self: center;
    position: absolute;
    align-items: center;
    text-align: center;
  `,
  ChartText: Styled.Text`
    display: flex;
    font-size: ${(props) => props.theme.font.size.small};
    color: ${(props) => props.theme.colors.light['shade-1']};
  `
}
