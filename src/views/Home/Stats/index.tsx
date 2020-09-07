// libs
import React, { useState, useEffect } from 'react'
import Styled from 'styled-components/native'
import { PieChart } from 'react-native-svg-charts'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Platform, FlatList } from 'react-native'
import moment from 'moment'

interface Slice {
  label: string
  value: number
}

interface Slide {
  isActive: boolean
}

const { width, height } = Dimensions.get('window')
const SLICE_WIDTH = width * 0.3
const SLICE_SPACING = width * 0.2

export default () => {
  const [selectedSlice, setSelectedSlice] = useState<Slice>()
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0)

  const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter']
  const values = [15, 25, 35, 45, 55].reverse()
  const colors = ['#79ffc6', '#79ffc6', '#79ffc6', '#79ffc6', '#79ffc6']

  const data = keys.map((key, index) => {
    return {
      key,
      value: values[index],
      svg: { fill: colors[index] },
      arc: { outerRadius: (70 + values[index]) + '%', padAngle: selectedSlice?.label === key ? 0.1 : 0.005 },
      onPress: () => setSelectedSlice({ label: key, value: values[index] })
    }
  })

  const flatListData = moment.months()

  useEffect(() => {
    setSelectedSlice({ label: data[0].key, value: data[0].value })
  }, [])

  return (
    <Stats.Layout colors={['#0574e5', '#022b8d']}>
      <Stats.Title>Stats</Stats.Title>
      <Stats.MonthSliderWrapper>
        <Stats.MonthSlider
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
              <Stats.SlideWrapper>
                <Stats.SlideText isActive={index === currentSliceIndex}>{item}</Stats.SlideText>
              </Stats.SlideWrapper>
            )
          }
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.round(ev.nativeEvent.contentOffset.x / SLICE_WIDTH)

            setCurrentSliceIndex(newIndex)
          }}>
        </Stats.MonthSlider>
        <Stats.MonthSliderPointer>
          |
          </Stats.MonthSliderPointer>
      </Stats.MonthSliderWrapper>
      <Stats.TotalExpensesWrapper>
        <Stats.TotalExpensesCurrency>$</Stats.TotalExpensesCurrency>
        <Stats.TotalExpensesTitle>1926</Stats.TotalExpensesTitle>
        <Stats.TotalExpensesSubTitle>.56</Stats.TotalExpensesSubTitle>
        {/* <Stats.ChartText>{selectedSlice?.value}</Stats.ChartText> */}
      </Stats.TotalExpensesWrapper>
      <Stats.ChartWrapper>
        <Stats.Chart
          outerRadius={'80%'}
          innerRadius={'45%'}
          data={data}
          animate={true}
          animationDuration={300}>
        </Stats.Chart>
        <Stats.ChartTextWrapper>
          <Stats.ChartText>{selectedSlice?.label}</Stats.ChartText>
          <Stats.ChartText>{selectedSlice?.value}</Stats.ChartText>
        </Stats.ChartTextWrapper>
      </Stats.ChartWrapper>
    </Stats.Layout>
  )
}

const Stats = {
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
  ChartWrapper: Styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    padding: 0 20px 30px 20px;
  `,
  Chart: Styled(PieChart)`
    display: flex;
    width: 90%;
    height: 90%;
    flex-direction: column;
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
