import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '../theme/ThemeProvider';
import {radii, typography} from '../theme/theme';

type BadgeTone = 'success' | 'warning' | 'info' | 'danger';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

export function Badge({label, tone = 'info'}: BadgeProps) {
  const {colors} = useAppTheme();
  const toneColor: Record<BadgeTone, string> = {
    success: colors.success,
    warning: colors.warning,
    info: colors.info,
    danger: colors.danger,
  };
  const color = toneColor[tone];

  return (
    <View style={[styles.badge, {borderColor: `${color}66`, backgroundColor: `${color}20`}]}>
      <Text style={[styles.label, {color}]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minHeight: 24,
    borderRadius: radii.round,
    borderWidth: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.micro,
  },
});
