// libs
import React, { useState } from 'react';
import Styled from 'styled-components/native'
import { AppLoading } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'

// components
import App from './src/views/App'

//theme 
import theme from './src/styled-components/theme'

// logo
import logo from './src/assets/icon.png'

export default () => {
  const [isSplashReady, setSplashReady] = useState(false)
  const [isAppReady, setAppReady] = useState(false)

  const _loadAppAsync = async () => {
    await _loadResourcesAsync()
    setTimeout(() => {
      _handleFinishLoading()
    }, 3500)
  }

  const _loadSplashResourcesAsync = async () => {
    await _loadSplashImagesAsync()
    await _loadFontsAsync()
  }

  const _loadResourcesAsync = async () => {
    await _loadImagesAsync()
  }

  const _loadSplashImagesAsync = async () => {
    const images = [require('./src/assets/icon.png')]

    const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync()
    })

    return Promise.all(cacheImages)
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
    console.warn(error);
  };

  const _handleSplashFinishLoading = () => {
    setSplashReady(true)
  }

  const _handleFinishLoading = () => {
    setAppReady(true)
  }

  if (!isSplashReady) {
    return (
      <AppLoading
        // @ts-ignore
        startAsync={_loadSplashResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleSplashFinishLoading}
        autoHideSplash={true}
      />
    )
  }

  if (!isAppReady) {
    return (
      <ThemeProvider theme={theme}>
        <Splash.Layout colors={['#0574e5', '#022b8d']}>
          <Splash.Logo
            source={logo}
            onLoad={_loadAppAsync}/>
          <Splash.AppTitle>CoinSafe</Splash.AppTitle>
        </Splash.Layout>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar hidden={true} />
      <App />
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
