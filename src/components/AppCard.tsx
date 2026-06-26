import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useAppTheme} from '../theme/ThemeProvider';
import {radii, spacing} from '../theme/theme';

type AppCardProps = {
  children: React.ReactNode;
  result?: boolean;
  style?: ViewStyle;
};

export function AppCard({children, result = false, style}: AppCardProps) {
  const {colors} = useAppTheme();
  const themedStyles = StyleSheet.create({
    card: {
      backgroundColor: result ? colors.cardRaised : colors.card,
      borderColor: result ? colors.danger : colors.border,
      shadowColor: result ? colors.danger : '#000000',
    },
  });

  return (
    <View
      style={[
        styles.card,
        themedStyles.card,
        result && styles.result,
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: radii.xl,
    padding: spacing.xl,
    borderWidth: 1,
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
  },
  result: {
    shadowOpacity: 0.14,
  },
});
