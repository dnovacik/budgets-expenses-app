// libs
import React, { useState, useEffect } from 'react'
import Styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Defs, LinearGradient as LG, Stop } from "react-native-svg";
import { Dimensions, Platform, FlatList } from 'react-native'
import moment from 'moment'

interface Slice {
  label: string
  value: number
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

export default () => {
  const [selectedSlice, setSelectedSlice] = useState<Slice>()
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0)

  const flatListData = moment.months()

  const data = [38, 32, 17, 16, 14, 11]

  useEffect(() => {
    // setSelectedSlice({ label: data[0].key, value: data[0].value })
  }, [])

  return (
    <Expenses.Layout colors={['#0574e5', '#022b8d']}>
      <Expenses.Title>Expenses</Expenses.Title>
      <Expenses.MonthSliderWrapper>
        <Expenses.MonthSlider
          horizontal={true}
          data={flatListData}
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
            alignItems: 'center'
          }}
          renderItem={({ item, index }) =>
            (
              <Expenses.SlideWrapper>
                <Expenses.SlideText isActive={index === currentSliceIndex}>{item}</Expenses.SlideText>
              </Expenses.SlideWrapper>
            )
          }
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.round(ev.nativeEvent.contentOffset.x / SLICE_WIDTH)

            setCurrentSliceIndex(newIndex)
          }}>
        </Expenses.MonthSlider>
        <Expenses.MonthSliderPointer>
          |
          </Expenses.MonthSliderPointer>
      </Expenses.MonthSliderWrapper>
      <Expenses.TotalExpensesWrapper>
        <Expenses.TotalExpensesCurrency>$</Expenses.TotalExpensesCurrency>
        <Expenses.TotalExpensesTitle>1926</Expenses.TotalExpensesTitle>
        <Expenses.TotalExpensesSubTitle>.56</Expenses.TotalExpensesSubTitle>
      </Expenses.TotalExpensesWrapper>
      <Expenses.ChartWrapper
        horizontal={true}
        bounces={false}
        snapToAlignment={'start'}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <Expenses.ChartBarWrapper>
          <Expenses.ChartBar height={180} colors={['#c0ffaa', '#16ffff']}></Expenses.ChartBar>
        </Expenses.ChartBarWrapper>
        <Expenses.ChartBarWrapper>
          <Expenses.ChartBar height={140} colors={['#c0ffaa', '#16ffff']}></Expenses.ChartBar>
        </Expenses.ChartBarWrapper>
        <Expenses.ChartBarWrapper>
          <Expenses.ChartBar height={130} colors={['#c0ffaa', '#16ffff']}></Expenses.ChartBar>
        </Expenses.ChartBarWrapper>
        <Expenses.ChartBarWrapper>
          <Expenses.ChartBar height={100} colors={['#c0ffaa', '#16ffff']}></Expenses.ChartBar>
        </Expenses.ChartBarWrapper>
        <Expenses.ChartBarWrapper>
          <Expenses.ChartBar height={80} colors={['#c0ffaa', '#16ffff']}></Expenses.ChartBar>
        </Expenses.ChartBarWrapper>
        <Expenses.ChartBarWrapper>
          <Expenses.ChartBar height={70} colors={['#c0ffaa', '#16ffff']}></Expenses.ChartBar>
        </Expenses.ChartBarWrapper>
        <Expenses.ChartBarWrapper>
          <Expenses.ChartBar height={60} colors={['#c0ffaa', '#16ffff']}></Expenses.ChartBar>
        </Expenses.ChartBarWrapper>
        <Expenses.ChartBarWrapper>
          <Expenses.ChartBar height={50} colors={['#c0ffaa', '#16ffff']}></Expenses.ChartBar>
        </Expenses.ChartBarWrapper>
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
  MonthSlider: Styled(FlatList as new () => FlatList<string>)`
    display: flex;
  `,
  MonthSliderPointer: Styled.Text`
    display: flex;
    position: absolute;
    width: 20px;
    height: 20px;
    left: ${SLICE_SPACING + 15}px;
    top: 55px;
    font-size: ${(props) => props.theme.font.size.medium};
    color: ${(props) => props.theme.colors.light['shade-1']};
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
  TotalExpensesWrapper: Styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: flex-end;
    justify-content: flex-start;
    padding-bottom: 60px;
    height: 30%;
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
  TotalExpensesTitle: Styled.Text`
    display: flex;
    font-size: ${(props) => props.theme.font.size.large};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-family: ${(props) => props.theme.font.familyRegular};
  `,
  TotalExpensesSubTitle: Styled.Text`
    display: flex;
    font-size: ${(props) => props.theme.font.size.mediumLarge};
    color: ${(props) => props.theme.colors.light['shade-3']};
    font-family: ${(props) => props.theme.font.familyLight};
    padding-bottom: 5px;
  `,
  ChartWrapper: Styled.ScrollView`
    display: flex;
    flex-direction: row;
    height: 50%;
    padding-left: ${SLICE_SPACING}px;
  `,
  ChartBarWrapper: Styled.View`
    display: flex;
    background-color: #235db6;
    height: 250px;
    width: 70px;
    margin-left: 2.5px;
  `,
  ChartBar: Styled(LinearGradient) <ChartBar>`
    display: flex;
    position: absolute;
    bottom: 0;
    width: 70px;
    height: ${(props) => props.height}px;
  `
}
