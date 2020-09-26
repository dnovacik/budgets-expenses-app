// libs
import React, { useState } from 'react';
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native'

// components
import App from './src/views/App'

//theme 
import theme from './src/styled-components/theme'

export default () => {
  const [isAppReady, setAppReady] = useState(false)

  const _loadAppAsync = async () => {
    await _loadResourcesAsync()
  }

  const _loadResourcesAsync = async () => {
    await _loadFontsAsync()
    await _loadImagesAsync()
  }

  const _loadImagesAsync = async (): Promise<void[]> => {
    const images = [
      require('./src/assets/icon.png'),
      require('./src/assets/splash.png')
    ]

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })

    return Promise.all(cacheImages)
  }

  const _loadFontsAsync = async (): Promise<void> => {
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

  const _handleFinishLoading = () => {
    setAppReady(true)
  }

  if (!isAppReady) {
    return (
      <AppLoading
        // @ts-ignore
        startAsync={_loadAppAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
        autoHideSplash={true}
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar hidden={true} />
      <App />
    </ThemeProvider>
  )
}
