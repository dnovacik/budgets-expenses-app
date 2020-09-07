// libs
import React from 'react'
import Styled from 'styled-components/native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'

// theme
import theme from '../../styled-components/theme'

interface RouteImageOptions {
  [key: string]: {
    icon: string
    type: 'FontAwesome5' | 'MaterialCommunityIcons' | 'Octicons'
  }
}

const routeIcons: RouteImageOptions = {
  Dashboard: {
    icon: 'view-dashboard-outline',
    type: 'MaterialCommunityIcons'
  },
  Expenses: {
    icon: 'credit-card-minus-outline',
    type: 'MaterialCommunityIcons'
  },
  Stats: {
    icon: 'chart-donut',
    type: 'MaterialCommunityIcons'
  },
  Settings: {
    icon: 'settings',
    type: 'Octicons'
  }
}

interface MenuIconProps {
  type: 'FontAwesome5' | 'MaterialCommunityIcons' | 'Octicons'
  props: {
    name: string
    size: number
    color: string
  }
}

interface ActiveProps {
  isActive: boolean
}

// constants
const whiteColor = theme.colors.light['shade-1']
const blackColor = theme.colors.dark['shade-1']
const activeColor = '#056ddd'

export default ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options

  if (!focusedOptions.tabBarVisible) {
    return null
  }

  const getMenuIcon = (props: MenuIconProps) => {
    if (props.type === 'MaterialCommunityIcons') {
      return <Navbar.MenuItemIconMaterialCommunity {...props.props} />
    } else if (props.type === 'Octicons') {
      return <Navbar.MenuItemIconOcticons {...props.props} />
    }

    return (
      <Navbar.MenuItemIconFontAwesome {...props.props} />
    )
  }

  return (
    <Navbar.Wrapper>
      <Navbar.Layout>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]

          const label = options.tabBarLabel
            ? options.tabBarLabel
            : options.title
              ? options.title
              : route.name

          const isActive = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isActive && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          console.log(route.name)

          return (
            <Navbar.MenuItemWrapper
              key={`${label}`}
              onPress={onPress}
              onLongPress={onPress}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              isActive={isActive}
            >
              {getMenuIcon({ ...routeIcons[route.name], props: { name: routeIcons[route.name].icon, size: 30, color: isActive ? activeColor : blackColor } })}
              <Navbar.MenuItemName isActive={isActive}>{label}</Navbar.MenuItemName>
            </Navbar.MenuItemWrapper>
          )
        })}
      </Navbar.Layout>
    </Navbar.Wrapper>
  )
}

const Navbar = {
  Wrapper: Styled.View`
    background-color: transparent;
    flex-direction: row;
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Layout: Styled.View`
    background-color: ${whiteColor};
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
  `,
  MenuItemWrapper: Styled.TouchableOpacity<ActiveProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 65px;
    min-width: 65px;
    align-items: center;
    padding: 8px;
    border-radius: 50px;
  `,
  MenuItemIconFontAwesome: Styled(FontAwesome5)`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    flex-direction: column;
  `,
  MenuItemIconMaterialCommunity: Styled(MaterialCommunityIcons)`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    flex-direction: column;
  `,
  MenuItemIconOcticons: Styled(Octicons)`
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    flex-direction: column;
  `,
  MenuItemName: Styled.Text<ActiveProps>`
    display: flex;
    color: ${(props) => (props.isActive ? activeColor : blackColor)};
    font-size: ${(props) => props.theme.font.size.smaller};
    font-family: ${(props) => props.theme.font.familyRegular}
  `,
}