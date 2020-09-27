// libs
import React, { useState, useEffect } from 'react'
import Styled from 'styled-components/native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialCommunityIcons, Octicons, AntDesign } from '@expo/vector-icons'
import { Dimensions, Animated } from 'react-native'

// theme
import theme from '../../styled-components/theme'

const AnimatedView = Animated.View

const { width, height } = Dimensions.get('window')
const MAIN_BUTTON_WIDTH = width * 0.2

interface SmoothNavigationProps {
  route: string
}

export default ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [navbarOpened, setNavbarOpened] = useState(false)

  const animationInterpolationValue = new Animated.Value(navbarOpened ? 0 : 1)

  const animate = (duration: number = 300) => {
    Animated.timing(animationInterpolationValue, {
      toValue: navbarOpened ? 1 : 0,
      duration: duration,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    animate()
  }, [navbarOpened])

  const navigateSmoothly = ({ route }: SmoothNavigationProps) => {
    if (state.index === state.routes.findIndex(r => r.name === route)) {
      return
    }

    setNavbarOpened(false)
    navigation.navigate(route)
  }

  return (
    <CustomNavbar.Wrapper>
      <CustomNavbar.MainButtonContainer>
        <CustomNavbar.MainButtonWrapper style={{
          transform: [
            {
              rotate: animationInterpolationValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '90deg']
              })
            }
          ]
        }}>
          <CustomNavbar.ButtonTouch onPress={() => setNavbarOpened(!navbarOpened)} onLongPress={() => setNavbarOpened(!navbarOpened)}>
            <CustomNavbar.MainButton name={'plus'} size={32} color={'#022b8d'} />
          </CustomNavbar.ButtonTouch>
        </CustomNavbar.MainButtonWrapper>
      </CustomNavbar.MainButtonContainer>
      <CustomNavbar.NavbarButtonsWrapper style={{
        transform: [
          {
            translateX: animationInterpolationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-300, MAIN_BUTTON_WIDTH]
            })
          }
        ],
        opacity: animationInterpolationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        })
      }}>
        <CustomNavbar.ButtonWrapper onPress={() => navigateSmoothly({ route: 'Stats' })} onLongPress={() => navigateSmoothly({ route: 'Stats' })}>
          <CustomNavbar.StatsButton name="chart-pie" size={32} color={'#022b8d'} />
        </CustomNavbar.ButtonWrapper>
        <CustomNavbar.ButtonWrapper onPress={() => navigateSmoothly({ route: 'Expenses' })} onLongPress={() => navigateSmoothly({ route: 'Expenses' })}>
          <CustomNavbar.ExpensesButton name="credit-card-minus-outline" size={32} color={'#022b8d'} />
        </CustomNavbar.ButtonWrapper>
        <CustomNavbar.ButtonWrapper onPress={() => navigateSmoothly({ route: 'Settings' })} onLongPress={() => navigateSmoothly({ route: 'Settings' })}>
          <CustomNavbar.SettingsButton name="settings" size={32} color={'#022b8d'} />
        </CustomNavbar.ButtonWrapper>
      </CustomNavbar.NavbarButtonsWrapper>

    </CustomNavbar.Wrapper>
  )
}

const CustomNavbar = {
  Wrapper: Styled.View`
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    height: ${MAIN_BUTTON_WIDTH}px;
    width: ${width - MAIN_BUTTON_WIDTH}px;
    zIndex: 1;
  `,
  MainButtonContainer: Styled.View`
    width: ${MAIN_BUTTON_WIDTH}px;
    height: ${MAIN_BUTTON_WIDTH}px;
    display: flex;
    align-items: center;
    justify-content: center;
    zIndex: 1;
  `,
  MainButtonWrapper: Styled(AnimatedView)`
    position: absolute;
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
    zIndex: 1;
  `,
  ButtonTouch: Styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
`,
  MainButton: Styled(AntDesign)`
    display: flex;
  `,
  NavbarButtonsWrapper: Styled(AnimatedView)`
    display: flex;
    width: 300px;
    height: ${MAIN_BUTTON_WIDTH}px;
    flex-direction: row;
    position: absolute;
    left: 0;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
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
  StatsButton: Styled(FontAwesome5)`
    display: flex;
  `,
  ExpensesButton: Styled(MaterialCommunityIcons)`
    display: flex;
  `,
  SettingsButton: Styled(Octicons)`
    display: flex;
  `
}