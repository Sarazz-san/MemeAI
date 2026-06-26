import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '../theme/ThemeProvider';
import {spacing, typography} from '../theme/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
};

export function ScreenHeader({title, subtitle}: ScreenHeaderProps) {
  const {colors} = useAppTheme();

  return (
    <View style={styles.header}>
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
      <Text style={[styles.subtitle, {color: colors.textMuted}]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    fontSize: 22,
  },
  subtitle: {
    ...typography.caption,
    marginTop: 2,
  },
});
