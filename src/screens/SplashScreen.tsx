import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppTheme} from '../theme/ThemeProvider';
import {rainbow, spacing, typography} from '../theme/theme';

export function SplashScreen() {
  const {colors} = useAppTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        damping: 12,
        stiffness: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  return (
    <View style={[styles.screen, {backgroundColor: colors.background}]}>
      <Animated.View style={[styles.content, {opacity, transform: [{scale}]}]}>
        <LinearGradient colors={rainbow} style={styles.logo}>
          <Text style={styles.logoText}>🎭</Text>
        </LinearGradient>
        <Text style={[styles.title, {color: colors.text}]}>MemeAI</Text>
        <Text style={[styles.subtitle, {color: colors.textMuted}]}>
          Génère des mèmes avec l'IA
        </Text>
        <LinearGradient colors={rainbow} style={styles.line} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  logoText: {
    fontSize: 42,
  },
  title: {
    ...typography.display,
    fontSize: 36,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  line: {
    width: 60,
    height: 3,
    borderRadius: 2,
    marginTop: spacing.xxl,
  },
});
