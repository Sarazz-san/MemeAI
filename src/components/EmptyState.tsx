import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '../theme/ThemeProvider';
import {spacing, typography} from '../theme/theme';

type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
};

export function EmptyState({icon, title, description}: EmptyStateProps) {
  const {colors} = useAppTheme();

  return (
    <View style={styles.empty}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
      <Text style={[styles.description, {color: colors.textMuted}]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.huge,
    paddingHorizontal: spacing.xxl,
  },
  icon: {
    fontSize: 42,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h3,
    textAlign: 'center',
  },
  description: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
