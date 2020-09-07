import 'styled-components'
import theme from './theme'
import { ReactNativeStyledInterface } from 'styled-components/native'

type CustomTheme = typeof theme

declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme extends CustomTheme { }
}

declare module 'styled-components/native-custom' {
  // original node_modules/@types/styled-components/native.d.ts
  import * as React from 'react'
  import * as ReactNative from 'react-native'

  declare interface StyledFlatList {
    FlatList<T>(styles: any): new () => ReactNative.FlatList<T>
  }

  declare const Styled: ReactNativeStyledInterface<DefaultTheme> & StyledFlatList
}
