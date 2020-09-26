// libs
import React from 'react'
import Styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Platform, FlatList, Animated } from 'react-native'

const { width, height } = Dimensions.get('window')
const SLICE_SPACING = width * 0.2

export default () => {
  return (
    <Settings.Layout colors={['#0574e5', '#022b8d']}>
      <Settings.TopContainer></Settings.TopContainer>
      <Settings.BottomContainer>
        <Settings.TitleWrapper>
          <Settings.SideTitle>Settings</Settings.SideTitle>
        </Settings.TitleWrapper>
        <Settings.RightContainer></Settings.RightContainer>
      </Settings.BottomContainer>
    </Settings.Layout>
  )
}

const Settings = {
  Layout: Styled(LinearGradient)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`,
  TopContainer: Styled.View`
  display: flex;
  height: 45%;
  width: 100%;
  flex-direction: row;
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
  RightContainer: Styled.ScrollView`
  display: flex;
  flex-direction: column;
  height: 320px;
  margin-right: 10px;
  align-self: center;
`,
}
