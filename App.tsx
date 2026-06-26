import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/navigation/AppNavigator';
import {SplashScreen} from './src/screens/SplashScreen';
import {ThemeProvider, useAppTheme} from './src/theme/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

function AppShell() {
  const [showSplash, setShowSplash] = useState(true);
  const {colors, isDark} = useAppTheme();

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 1600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      {showSplash ? <SplashScreen /> : <AppNavigator />}
    </SafeAreaProvider>
  );
}

export default App;
