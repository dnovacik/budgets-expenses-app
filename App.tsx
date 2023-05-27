// libs
import React, { useCallback, useEffect, useState } from 'react'
import Styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { StatusBar, View } from 'react-native'
import { ThemeProvider } from 'styled-components'
import * as SplashScreen from 'expo-splash-screen'

// components
import App from './src/views/App'

//theme 
import theme from './src/styled-components/theme'

// logo
import logo from './src/assets/icon.png'

SplashScreen.preventAutoHideAsync();

export default () => {
  const [isAppReady, setAppReady] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      try {
        await _loadAppAsync()
      } catch (e) {
        console.warn(e)

        if (e instanceof Error) {
          _handleLoadingError(e)
        }
      }
    }

    prepare();
  }, [])

  const _loadAppAsync = async () => {
    await _loadResourcesAsync()
    setTimeout(() => {
      _handleFinishLoading()
    }, 3500)
  }

  const _loadResourcesAsync = async () => {
    await _loadFontsAsync()
    await _loadImagesAsync()
  }

  const _loadImagesAsync = async () => {
    const images = [
      require('./src/assets/icon.png'),
      require('./src/assets/splash.png')
    ]

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })

    return Promise.all(cacheImages)
  }

  const _loadFontsAsync = async () => {
    const fonts = {
      'Lato': require('./src/assets/fonts/Lato-Regular.ttf'),
      'Lato-Light': require('./src/assets/fonts/Lato-Light.ttf'),
      'Lato-Thin': require('./src/assets/fonts/Lato-Thin.ttf'),
      'Lato-Black': require('./src/assets/fonts/Lato-Black.ttf'),
      'Lato-Bold': require('./src/assets/fonts/Lato-Bold.ttf')
    }

    return Font.loadAsync(fonts)
  }

  const _handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  const _handleFinishLoading = () => {
    setAppReady(true)
  }

  const onRootLayout = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync()
    }
  }, [isAppReady])

  if (!isAppReady) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <View onLayout={onRootLayout} style={{ flex: 1}}>
        <StatusBar hidden={true} />
        <App />
      </View>
    </ThemeProvider>
  )
}

const Splash = {
  Layout: Styled(LinearGradient)`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  Logo: Styled.Image`
    display: flex;
    width: 160px;
    height: 160px;
  `,
  AppTitle: Styled.Text`
    display: flex;
    margin-top: 30px;
    font-family: ${(props) => props.theme.font.familyRegular};
    color: ${(props) => props.theme.colors.light['shade-1']};
    font-size: ${(props) => props.theme.font.size.mediumLarge};
  `
}
